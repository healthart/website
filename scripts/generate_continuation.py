#!/usr/bin/env python3
"""Generate post-2025-08-02 Health Art continuation markdown files.

The original project has no published generator, so this script creates
structured Health Art style drafts from public RSS metadata/show notes.
Hand-written files copied into the target directories are preserved.
"""

from __future__ import annotations

import datetime as dt
import email.utils
import html
import json
import os
import re
import shutil
import textwrap
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
CONTINUATION = WORKSPACE / "healthart-continuation"
CUTOFF = dt.datetime(2025, 8, 2, tzinfo=dt.timezone.utc)
AUTO_DRAFT_MARKER = "基于公开 RSS/show notes 自动整理。本文是 Health Art 停更后的补全文档草稿"
REFRESH_AUTO_DRAFTS = os.environ.get("REFRESH_AUTO_DRAFTS") == "1"

FEEDS = {
    "hubermanlab": "https://feeds.megaphone.fm/hubermanlab",
    "peterattiamd": "https://rss.libsyn.com/shows/121729/destinations/713489.xml",
    "diaryofaceo": "https://rss2.flightcast.com/xmsftuzjjykcmqwolaqn6mdn",
}

SOURCE_LABELS = {
    "hubermanlab": "Huberman Lab",
    "peterattiamd": "The Peter Attia Drive",
    "diaryofaceo": "The Diary Of A CEO",
}

HUBERMAN_MISSING_LINKS = {
    "The Mental Frame & Specific Daily Actions to Succeed | Andy Stumpf": "https://www.hubermanlab.com/episode/the-mental-frame-and-specific-daily-actions-to-succeed-andy-stumpf",
    "Tools to Bolster Your Mental Health & Confidence | Dr. Paul Conti": "https://www.hubermanlab.com/episode/tools-to-bolster-your-mental-health-and-confidence-paul-conti",
    "Male Roles, Obligations and Options for Building a Fulfilling Life | Scott Galloway": "https://www.hubermanlab.com/episode/male-roles-obligations-and-options-for-building-a-fulfilling-life-scott-galloway",
    "Essentials: The Science & Practice of Movement | Ido Portal": "https://www.hubermanlab.com/episode/essentials-the-science-and-practice-of-movement-ido-portal",
    "Essentials: How to Optimize Your Hormones for Health & Vitality | Dr. Kyle Gillett": "https://www.hubermanlab.com/episode/essentials-how-to-optimize-your-hormones-for-health-and-vitality-kyle-gillett",
    "Essentials: Using Hypnosis to Enhance Mental & Physical Health & Performance | Dr. David Spiegel": "https://www.hubermanlab.com/episode/essentials-hypnosis-enhance-mental-physical-health-performance-david-spiegel",
    "How to Speak Clearly & With Confidence | Matt Abrahams": "https://www.hubermanlab.com/episode/speak-clearly-with-confidence-matt-abrahams",
}


@dataclass
class Episode:
    source: str
    title: str
    link: str
    published: dt.date
    description: str
    topics: list[str]


def normalize_text(value: str) -> str:
    value = html.unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"https?://", "", value)
    value = re.sub(r"[^a-z0-9]+", "_", value)
    value = re.sub(r"_+", "_", value).strip("_")
    return value[:90] or "episode"


def link_slug(link: str, title: str) -> str:
    if link:
        slug = link.rstrip("/").split("/")[-1]
        if slug:
            return slugify(slug)
    return slugify(title)


def clean_title(title: str) -> str:
    title = re.sub(r"^#\d+\s*[‒—-]\s*", "", title)
    title = re.sub(r"^Essentials:\s*", "", title)
    title = re.sub(r"\s*\|\s*.*$", "", title)
    return title.strip()


def contains_ai_topic(text: str) -> bool:
    return bool(
        re.search(
            r"\b(?:artificial intelligence|a\.?i\.?|agi|chatgpt|robots?|superintelligence|ai safety)\b",
            text,
        )
    )


def extract_topics(description: str) -> list[str]:
    match = re.search(r"Timestamps\s*(.*)", description)
    topics: list[str] = []
    if match:
        raw = match.group(1)
        for _, label in re.findall(r"\((\d{2}:\d{2}:\d{2})\)\s*([^()]+?)(?=\s*\(\d{2}:\d{2}:\d{2}\)|$)", raw):
            label = re.sub(r"\bSponsor:.*", "", label).strip(" ;,.")
            if label and len(label) < 120 and not label.lower().startswith(("ag1", "lmnt", "betterhelp", "function")):
                topics.append(label)
            if len(topics) >= 8:
                break
    if topics:
        return topics

    chapter_match = re.search(r"(?:Chapters\s*)?(\d{2}:\d{2}(?::\d{2})?\s+.+)", description, flags=re.I)
    if not chapter_match:
        return []
    raw = chapter_match.group(1)
    for label in re.findall(r"\d{2}:\d{2}(?::\d{2})?\s+(.+?)(?=\s+\d{2}:\d{2}(?::\d{2})?\s+|$)", raw):
        label = label.strip(" ;,.")
        if not label or len(label) >= 120:
            continue
        if label.lower() in {"intro", "ads", "sponsors"} or label.lower().startswith(("ads", "sponsor")):
            continue
        topics.append(label)
        if len(topics) >= 8:
            break
    return topics


def fetch_episodes() -> list[Episode]:
    episodes: list[Episode] = []
    for source, feed_url in FEEDS.items():
        data = urllib.request.urlopen(feed_url, timeout=30).read()
        root = ET.fromstring(data)
        for item in root.find("channel").findall("item"):
            title = normalize_text(item.findtext("title"))
            link = html.unescape(item.findtext("link") or "").split("?")[0]
            guid = normalize_text(item.findtext("guid"))
            if source == "hubermanlab" and not link:
                link = HUBERMAN_MISSING_LINKS.get(title, "")
            if not link:
                link = f"{feed_url}#{slugify(guid or title)}"
            try:
                published_dt = email.utils.parsedate_to_datetime(item.findtext("pubDate") or "")
                if published_dt.tzinfo is None:
                    published_dt = published_dt.replace(tzinfo=dt.timezone.utc)
            except Exception:
                continue
            if published_dt <= CUTOFF:
                continue
            description = normalize_text(
                item.findtext("{http://purl.org/rss/1.0/modules/content/}encoded")
                or item.findtext("description")
                or item.findtext("{http://www.itunes.com/dtds/podcast-1.0.dtd}summary")
            )
            episodes.append(
                Episode(
                    source=source,
                    title=title,
                    link=link,
                    published=published_dt.date(),
                    description=description,
                    topics=extract_topics(description),
                )
            )
    return episodes


def existing_links() -> dict[str, Path]:
    links: dict[str, Path] = {}
    for folder in FEEDS:
        for path in (ROOT / folder).glob("*.md"):
            if path.name in {"index.md", "new.md"}:
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            for link in re.findall(r"^原文链接：\s*(\S+)", text, flags=re.M):
                links[link.split("?")[0].rstrip("/")] = path
    return links


def copy_handwritten_files() -> list[Path]:
    copied: list[Path] = []
    if not CONTINUATION.exists():
        return copied
    for folder in FEEDS:
        source_dir = CONTINUATION / folder
        target_dir = ROOT / folder
        if not source_dir.exists():
            continue
        target_dir.mkdir(parents=True, exist_ok=True)
        for source_path in source_dir.glob("*.md"):
            target_path = target_dir / source_path.name
            if not target_path.exists():
                shutil.copy2(source_path, target_path)
                copied.append(target_path)
    return copied


def classify(title: str, description: str) -> str:
    title_l = title.lower()
    t = f"{title} {description}".lower()
    if "male roles" in title_l or "masculinity" in title_l:
        return "mental"
    checks = [
        ("screening", ["screening", "cancer", "colonoscopy", "psa", "breast", "prostate", "colorectal"]),
        ("fitness", ["exercise", "training", "muscle", "strength", "cardio", "flexibility", "movement", "vo2", "zone"]),
        ("nutrition", ["nutrition", "diet", "foods", "metabolic", "glucose", "obesity", "protein", "hydration"]),
        ("meaning", ["christian", "god", "religion", "faith", "meaning", "buddhist", "spiritual"]),
        ("mental", ["mental", "depression", "anxiety", "grief", "trauma", "ptsd", "confidence", "happiness", "self esteem", "vulnerability", "courage", "discipline", "belief", "purpose"]),
        ("sleep", ["sleep", "insomnia", "circadian", "melatonin"]),
        ("pharmacology", ["medication", "supplement", "drug", "peptide", "pharmacology", "psychedelic", "nicotine"]),
        ("genetics", ["genetic", "apoe", "gene", "dna", "epigenetic"]),
        ("relationship", ["relationship", "romance", "attraction", "social", "communication", "speak"]),
        ("women", ["fertility", "women", "hormone", "menopause", "endometriosis", "adenomyosis"]),
        ("thinking", ["scientific", "thinking", "framework", "decision", "risk"]),
    ]
    for category, keywords in checks:
        if any(k in title_l for k in keywords):
            return category
    if contains_ai_topic(title_l) or any(k in title_l for k in ["tech whistleblower", "ai expert", "ai whistleblower", "creator of ai"]):
        return "ai_future"
    if any(k in title_l for k in ["economy", "capitalism", "war", "politics", "president", "prime minister", "immigration", "democracy", "authoritarian", "middle class"]):
        return "society"
    if any(k in title_l for k in ["ceo", "entrepreneur", "business", "company", "startup", "founder", "leadership", "management", "money", "rich", "investor"]):
        return "business"
    for category, keywords in checks:
        if any(k in t for k in keywords):
            return category
    if contains_ai_topic(t) or any(k in t for k in ["tech whistleblower", "ai expert", "ai whistleblower", "creator of ai"]):
        return "ai_future"
    if any(k in t for k in ["economy", "capitalism", "war", "politics", "president", "prime minister", "immigration", "democracy", "authoritarian", "middle class"]):
        return "society"
    if any(k in t for k in ["ceo", "entrepreneur", "business", "company", "startup", "founder", "leadership", "management", "money", "rich", "investor"]):
        return "business"
    return "general"


TITLE_PREFIX = {
    "screening": "筛查与风险管理",
    "sleep": "睡眠优化",
    "fitness": "训练与身体功能",
    "nutrition": "营养与代谢健康",
    "mental": "心理健康与韧性",
    "pharmacology": "药物、补剂与安全边界",
    "genetics": "遗传风险与个体化决策",
    "relationship": "关系、沟通与社会连接",
    "women": "女性健康与生殖决策",
    "thinking": "科学思维与健康决策",
    "business": "事业、领导力与财富决策",
    "ai_future": "人工智能、未来趋势与风险判断",
    "society": "社会、政治与系统风险",
    "meaning": "意义、信念与人生选择",
    "general": "健康行动指南",
}

DIARY_TITLE_OVERRIDES = {
    "Dr Rachel Rubin: Women’s Sexual Health, Menopause, Hormone Replacement Therapy (HRT), and Orgasms!": "女性性健康、围绝经与激素治疗",
    "The 4 Personalities Living In Your Brain! How To Switch Between Them": "内在多重人格状态与自我切换",
    "Vice President JD Vance: No One Saw This Coming, The Ceasefire Is Real!": "美国政治与停火局势判断",
    "Creatine Expert: Creatine Is The Secret To Weight Loss": "肌酸、减脂与补剂价值判断",
    "Is Milk Healthy? The Truth About Dairy, Sugar, Fruit And Fasting": "乳制品、糖、水果与禁食取舍",
    "Archaeology WARNING: They Secretly Found Antarctica 300 Years Before Us - Graham Hancock": "古文明叙事与证据边界",
    "Death of the Middle Class: Billionaire vs Entrepreneur DEBATE - Daniel Priestley v Nick Hanauer": "中产阶级压力与财富分配",
    "Brené Brown on Vulnerability, Self Esteem and The Four Skillsets Of Courage": "脆弱、自尊与勇气训练",
    "Christian Apologist: The Truth About Christianity (And Why Atheism Is Fading)": "基督教信仰与无神论争议",
    "Tech Whistleblower: You Only Have 3 Years Left Before This Hits! - Mo Gawdat": "人工智能冲击时间表与个人准备",
    "The Hidden Organ That Controls Exactly How You Age!": "衰老关键器官与长寿基础",
    "EMERGENCY DEBATE: The Economy Is About To Collapse! The 2026 AI Crisis Nobody Sees Coming": "人工智能经济冲击与系统风险",
    "Bruno Fernandes: Roy Keane Twisted My Words. They Offered Me £200M, I Said No.": "高压职业选择与外界评价",
    "AI Safety Expert Predicts The Next 20 Years! Will It Really Take All Jobs?": "人工智能安全、就业与未来二十年",
    "World-Renowned Physicist: The Truth About Aliens! UFOs Are Definitely Robotic - Michio Kaku": "外星生命叙事与科学证据边界",
    "Fatty Liver Expert: Your Liver Is Filling With Fat Right Now - Dr David Unwin": "脂肪肝风险与代谢干预",
    "The Link Between Weight Gain and Sleep! Are Sleep Trackers Harmful Or Helpful?": "睡眠、体重与睡眠追踪器判断",
    "UFO Roundtable: CIA Physicist Proves Aliens Exist": "不明飞行物叙事与证据边界",
    "Pulitzer Prize Historian: You Won't Notice Until It's Too Late!": "历史视角下的社会风险预警",
    "This Is The Best Exercise Protocol For Women!": "女性训练方案与身体适应",
    "WW3 Expert: This Could Trigger Global Starvation": "战争升级与粮食系统风险",
    "Scott Galloway: AI Wasn’t Built For You. The Rich Don’t Need You Anymore!": "人工智能、财富集中与个人位置",
    "Neil deGrasse Tyson On The Future Of Humanity! Will We Ever Go To Mars?": "人类未来、火星与科学想象",
    "Money Expert: Buying A House Is A Mistake! Becoming Rich is Simple But You Won’t Do It!": "买房、财富积累与现金流判断",
    "Sex Scientist: Phone Addiction Is Killing Your Sex Life More Than Porn!": "手机成瘾、亲密关系与性健康",
    "Neuroscientist’s Proof Of Life After Death! Dr Tara Swart": "濒死体验与意识边界",
    "Stanford Neuroscientist: Can’t Remember Your Dreams? Your Brain May Be Warning You!": "梦境记忆与大脑健康信号",
    "The Peptide Expert: Big Pharma Are Hiding This Powerful Peptide From You! - Dr. Alex Tatem": "多肽疗法、商业宣传与安全边界",
    "Insulin Is The Reason You're Gaining Fat! How To Lower It Now": "胰岛素、脂肪增长与代谢调节",
    "World Collapse Expert (Ian Bremmer): The Real Crisis Is What Comes After Trump": "地缘政治转折与风险判断",
    "The Iran War Expert: The Most Dangerous Stage Begins Now": "伊朗战争升级与全球风险",
    "Your Thoughts Shape Your Reality! How To Rewrite Limiting Beliefs": "限制性信念与认知重写",
    "Ivanka Trump: My Dad Told Me Two Weeks Before He Ran For President!": "政治家庭、竞选与权力叙事",
    "Financial Crash Expert: In 3 months We’ll Enter A Famine! If Iran Doesn’t Surrender It's The End!": "金融崩盘、饥荒与地缘风险",
    "Mouthwash REVERSES The Benefits Of Exercise! Dr Nathan Bryan": "漱口水、血管信号与运动收益",
    "Pierre Poilievre, The Next Prime Minister of Canada?: The Economy Is About To Collapse!": "加拿大政治与经济风险",
    "Anti-Aging Expert: Stop Touching Receipts Immediately! The Fast Way To Shrink Visceral Fat": "环境暴露、内脏脂肪与抗衰",
    "The Truth About Protein Intake and The Simplest Way To Lose Fat": "蛋白摄入与减脂基础",
    "AI Whistleblower: We Are Being Gaslit By The AI Companies! They’re Hiding The Truth About AI": "人工智能公司透明度与风险沟通",
    "David Sinclair: Can Aging Be Reversed? After 8 Weeks, Cells Appeared 75% Younger In Tests!": "逆转衰老主张与证据边界",
    "The Direct Path To Purpose And Happiness! These 2 Decisions Matter Most": "目标感、幸福与关键选择",
    "Manipulation Expert: How To Influence Anyone & Make Them Do Exactly What You Want! - Chase Hughes": "影响力、操控与沟通边界",
    "Daniel Priestley: Plumbers Will Earn More Than Lawyers! I Predicted 2008, Now I'm Warning About 2029": "职业结构变化与经济周期预警",
    "The Antibiotic Alternative Big Pharma Doesn't Want You To Know!": "抗生素替代方案与耐药风险",
    "The Iran War Expert: I Simulated The Iran War for 20 Years. Here’s What Happens Next": "伊朗战争情景推演与风险判断",
    "No.1 Christianity Expert: The Truth About Christianity! The Case For Jesus (Historian's Proof)": "基督教历史证据与信仰判断",
    "Stressed About Money? Nischa's Step-by-Step Guide To Financial Security": "财务安全、预算与现金流",
    "WW3 Threat Assessment: \"Trump Bombing Iran Just Increased Nuclear War Threat\" The Terrifying Reality": "核战争威胁与安全判断",
    "Top CIA Security Advisor: Jeffrey Epstein Epstein Was A Made Up Person & They Can See Your Messages!": "阴谋叙事、隐私与证据边界",
    "Your Excuses Will Destroy You, To Be Disciplined Is To Be Free!": "自律、借口与行动自由",
    "Pregnancy Diet Expert: The Pregnancy Diet That Rewrites DNA! Why Pregnant Moms Are Being Lied To!": "孕期饮食、表观遗传与风险沟通",
    "Uber CEO: At Uber, If You Don’t Perform, You’re Out! Uber Was Losing $3b A Year": "绩效文化、亏损公司与管理取舍",
    "Can Creatine Offset Sleep Deprivation? Is It Really The Best Supplement?": "肌酸、睡眠不足与补剂判断",
    "The Greatest Climber Alive: I Shouldn't Have Attempted That Climb!": "高风险挑战与决策复盘",
    "Brain Rot Emergency: These Internal Documents Prove They’re Controlling You!": "短内容成瘾与注意力控制",
    "Buddhist Monk Reveals How To Break Free From Pain and Anger!": "痛苦、愤怒与情绪松绑",
    "World No.1 Divorce Lawyer: This Is A Sign You’ll Divorce In 10 Years!": "离婚信号与关系修复",
    "Human Sleep Expert: Don't Pee In The Middle Of The Night & Why Night Time Sex Isn't A Good Idea!": "夜尿、夜间性生活与睡眠健康",
    "Is There A Safe Amount Of Alcohol? What Happens To The Body When You Drink!": "酒精安全剂量与身体影响",
    "Cognitive Decline Expert: The Disease That Starts in Your 30s but Kills You in Your 70s": "认知衰退早期风险与预防",
    "I Met An Uncontacted Tribe: They Killed My Friend!": "极端探索、风险与文化边界",
    "The Fastest Way To Lose Fat Without Losing Muscle! - Dr Andy Galpin": "减脂保肌训练策略",
    "Early Retirement Expert: A House Vs Stocks, Here's The Truth!": "房产、股票与提前退休判断",
    "The Microbiome Doctor: Doctors Were Wrong! The 3 Foods You Should Eat For Perfect Gut Health!": "肠道菌群与核心食物选择",
    "How To Talk About Money With Your Partner! The Mistakes Most Couples Make!": "伴侣金钱沟通与财务透明",
    "The Man Warning The West: Trump Is Changing The World Behind The Scenes!": "西方秩序变化与政治风险",
    "CIA Whistleblower: They Can See All Your Messages! I Was Under Surveillance In Pakistan!": "监控、隐私与海外安全",
    "Here's What Happens When A Nuclear Bomb Drops! These Countries Will Be Safe!": "核爆场景与安全风险判断",
    "Tony Robbins: No One Is Ready For What's Coming! Why The Next Decade Will Break People!": "未来十年压力与心理韧性",
    "Passive Income Expert: Buying A House Makes You Poorer Than Renting! Crypto Isn't A Smart Investment": "被动收入、买房与加密投资",
    "Your Food Could Be Making You Depressed! How Diet Impacts Mental Health!": "饮食与抑郁风险",
    "Top Insulin Expert: Insulin Is More Dangerous Than Sugar! This Will Strip Fat Faster Than Anything!": "胰岛素、糖与减脂策略",
    "Dopamine Expert: Short Form Videos Are Frying Your Brain! This Is A Dopamine Disaster!": "短视频、多巴胺与注意力修复",
    "Make 2026 Your Best Year Yet! 5 Daily Practices For Health And Happiness": "年度习惯、健康与幸福实践",
    "Leaky Gut Expert: This Gut Mistake Leads To Cancer. The Cheap Spice That Helps Repair A Damaged Gut!": "肠漏、癌症风险与肠道修复",
    "Chris Williamson: If You Don't Fix This Now, 2026 Is Already Over!": "年度规划与人生优先级",
    "Is Modern Parenting Causing ADHD? Your Decisions Shape Your Child’s Mind!": "现代育儿与注意力风险",
    "This Is The Fastest Way To Get Dementia...The 6 Science-Backed Brain Fixes!": "痴呆风险与大脑修复策略",
    "The Gaslighting & Conversation Expert: This Is A Sign You’ll Divorce in 10 Years!": "煤气灯效应、沟通与离婚预警",
    "Foot Health Expert Reveals the Best Shoes for Strength and Mobility!": "足部健康、鞋履与活动能力",
    "Creator of AI: We Have 2 Years Before Everything Changes! These Jobs Won't Exist in 24 Months!": "人工智能两年窗口与岗位风险",
    "Harvard’s Behaviour Expert: The Psychology Of Why People Don't Like You!": "社交心理与被讨厌的原因",
    "Confidence Can Be Taught! Use These Body Language Cues To Your Advantage!": "自信训练与身体语言",
    "Discipline Expert: The Habit That Will Make Or Break Your Entire 2026! James Clear": "习惯系统与自律建设",
    "Passive Income Expert: How To Make 10k Per Month In 90 Days!": "副业收入框架与现实边界",
    "What Women Really Want In A Man! Don’t Do This On A First Date!": "择偶信号与第一次约会",
    "The Man Who Wrote The Book On AI: 2030 Might Be The Point Of No Return! We've Been Lied To About AI!": "人工智能失控风险与2030临界点",
    "Secret Service Agent: Never Label Someone A Narcissist! This Habit Makes People Hate Talking To You!": "人际标签、倾听与沟通习惯",
    "No.1 Eye Doctor Reveals The Truth About Dark Circles, Diet and Blue Light!": "黑眼圈、饮食与蓝光影响",
    "AI Expert: We Have 2 Years Before Everything Changes! We Need To Start Protesting! - Tristan Harris": "人工智能危机、抗议与社会行动",
    "Insulin Doctor: This Is The First Sign Of Dementia! The Shocking Link Between Keto & Brain Decline!": "胰岛素、酮饮食与脑健康风险",
    "Anxiety Is Just A Prediction! Rewrite Old Stories and Build Emotional Safety": "焦虑预测、旧故事与情绪安全",
    "Kevin Hart: They're Lying To You About How To Become A Millionaire! I Was Doing 28 Sets A Weekend!": "财富叙事、工作强度与现实选择",
    "No.1 Sleep Expert: Magnesium Isn’t Helping You Sleep! This Sleep Habit Increases Heart Disease 57%": "镁、睡眠习惯与心脏风险",
    "Why You’re Never Satisfied! The 4 Pillars of Lasting Happiness": "满足感与持久幸福四支柱",
    "Tim Ferriss: 4 Science-Backed Tools That Rewired Decades of Childhood Trauma & Depression": "童年创伤、抑郁与科学工具",
    "The Woman Who Makes Millionaires: Only 1% of People Do This! The PPF Framework Will 10x Your Income!": "收入增长方法与财富习惯",
    "Don’t Brush Your Teeth After Sugar! The Best Oral Care Routine": "糖后刷牙与口腔护理",
    "No.1 Brain Scientist: Your Brain Is Lying To You! Here's How I Discovered The Truth!": "大脑错觉与自我认知",
    "Brené Brown: We're In A Spiritual Crisis! The Hidden Epidemic No One Wants To Admit!": "精神危机与意义缺失",
    "Calories In, Calories Out Is A Myth! Why Most Diets Fail - Dr. Jason Fung": "热量模型、减肥失败与饮食策略",
    "Kamala Harris: America Is At Breaking Point & I'm Deeply Concerned About The State Of The Country!": "美国政治压力与社会裂缝",
    "Longevity Debate: The Truth About Weight Loss, Muscle, and Creatine!": "减重、肌肉与肌酸争议",
    "Why Does Commitment Feel So Scary? How to Build a Strong, Lasting Relationship": "承诺恐惧与长期关系建设",
    "Oz Pearlman (Mentalist): This Small Mistake Makes People Dislike You! They Do This, They’re Lying!": "读人、撒谎线索与社交误判",
    "Jürgen Klopp: Would You Go Back To Manage LFC...? The Real Reason I Fell In Love With Liverpool!": "领导力、归属感与职业离开",
    "Are Your Household And Beauty Products Secretly Toxic? Dr Yvonne Burkart": "家居美妆暴露与毒性风险",
    "Women's Fertility & Lifestyle Debate: Dangers Of Not Having A Period! Fasting Can Backfire For Women": "女性生育、月经与禁食风险",
    "Neil deGrasse Tyson: The Brutal Truth About Astrology! Our Breath Contains Molecules Jesus Inhaled!": "占星、科学怀疑与宇宙视角",
    "The 7-Day Training Blueprint To Live Longer! Peter Attia": "七天长寿训练蓝图",
    "Louis Tomlinson: \"The Room Was Cold That Day\". When The Police Knocked... I Just Knew": "丧亲、名声与人生低谷",
    "Financial Expert: Passive Income Is A Scam! Post-Traumatic Broke Syndrome Is Controlling Millions!": "财务创伤与被动收入迷思",
    "Sadhguru on Why You Don’t Need a Life Purpose!": "人生目的、执念与内在自由",
    "No. 1 Sugar Expert: 17 Seconds Of Pleasure Can Rewire Your Brain!": "糖、快感与大脑重塑",
    "Atheist vs Christian vs Spiritual Thinker: The Paperclip Problem That Exposes Religion!": "宗教、无神论与人工智能隐喻",
    "Captivate A Room Even If You’re Shy! - Vinh Giang": "害羞者的表达与房间影响力",
    "Secret Agent (Evy Poumpouras): Never Be Yourself At Work! Authenticity Is Quietly Sabotaging You! - Evy Poumpouras": "职场真实感与自我呈现",
    "The Insulin & Heart Doctor: The Fastest Way To Burn Dangerous Visceral Fat. This is How Insulin Is Quietly Clotting Your Blood! - Dr Pradip Jamnadas": "胰岛素、内脏脂肪与心血管风险",
    "Can Eye Movements Heal Trauma? Bessel Van Der Kolk Explains EMDR Therapy!": "眼动疗法与创伤修复",
    "Matthew McConaughey: The Silent Crisis No One Is Talking About! The Harsh Truth About Living Without Faith": "信仰缺失与现代精神危机",
    "No.1 Money Saving Experts: Do Not Buy A House! Putting Money In A Bank Makes You Poorer!": "省钱、买房与银行收益判断",
    "Ray Dalio: We’re Heading Into Very, Very Dark Times! America & The UK’s Decline Is Coming!": "大国债务周期与衰退预警",
    "Roman Yampolskiy: These Are The Only 5 Jobs That Will Remain In 2030 & Proof We're Living In a Simulation!": "人工智能岗位冲击与模拟假说",
    "The Diabetes Doctor: 80% Of Adults Are Heading For Chronic Disease! Keto’s Shocking Effect On Your Brain!": "糖尿病、慢病风险与酮饮食争议",
    "This Longevity Protocol Actually Works! - Biohacker Bryan Johnson": "长寿实验、指标追踪与风险边界",
    "How To Be Charismatic and Gain the Edge in Any Room - Charlie Houpert": "魅力表达与社交影响力",
    "Water Fasting Scientist: Surprising Link Between Fasting & Cancer! Fasting Completely Resets Your Gut Microbiome!": "水断食、癌症线索与肠道菌群",
    "6 Daily Habits That Expose Your Fake Values - Deepak Chopra": "日常习惯与真实价值观",
    "Former CIA Spies: \"The CIA Tried To Ban This Story!\" We're Leaving The US by 2030!": "情报机构叙事与移居风险",
    "Fat Burning Expert: The Real Reason You Can’t Lose Weight! PCOS, Menopause & Stubborn Belly Fat": "多囊卵巢综合征、绝经与顽固脂肪",
    "Alain de Botton - Individualism Is Making Us Miserable!": "个人主义、孤独与现代痛苦",
    "Mohnish Pabrai (Billionaire Investor): The $100 Investment Hack That's Disappearing Fast! The Fastest Way To Financial Freedom!": "小额投资与财富自由",
    "ChatGPT Brain Rot Debate: The Fastest Way to Get Dementia, Watch This Before Using ChatGPT Again, Especially If Your Kids Use It!": "聊天机器人、认知负担与儿童使用风险",
    "Simple Breathing Techniques To Reduce Stress Fast! - James Nestor": "呼吸练习与快速减压",
    "Neuroscience Expert Dr. Tara Swart on Evidence We Can Communicate After Death and Her Experience Speaking to the Dead!": "死后沟通体验与神经科学边界",
    "No.1 Herbal Medicine Expert: This Over The Counter Drug Is Quietly Killing You & They’re Lying About Medicinal Plants!": "草药、非处方药与安全风险",
    "This Diet Could Fix Your Mental Health! - Dr Georgia Ede": "饮食干预与心理健康",
    "Money Making Experts: This 3-Step 'Offer' Formula Makes $20k Per Month! Alex Hormozi, Codie Sanchez, Daniel Priestley": "报价设计、创业收入与执行公式",
    "Ex-Google Exec (Mo Gawdat) on AI: The Next 15 Years Will Be Hell Before We Get To Heaven… And Only These 5 Jobs Will Remain!": "人工智能未来十五年与职业准备",
}


def localized_title_for_episode(ep: Episode) -> str:
    category = classify(ep.title, ep.description)
    topic_title = clean_title(ep.title)
    if ep.source == "diaryofaceo":
        replay_stripped = re.sub(r"^Most Replayed Moment:\s*", "", topic_title)
        topic_title = DIARY_TITLE_OVERRIDES.get(topic_title) or DIARY_TITLE_OVERRIDES.get(replay_stripped) or "本期重点行动指南"
    return f"{TITLE_PREFIX[category]}：{topic_title}"


ADVICE = {
    "screening": [
        "先确认自己属于普通风险还是高风险人群，再决定筛查起始时间、频率和工具。",
        "把症状评估和常规筛查分开：有症状时应走诊断流程，而不是等待下一次筛查。",
        "保留检查报告和随访建议，尤其是影像、病理、内镜质量指标和下一次复查时间。",
        "与医生讨论假阳性、漏检、过度诊断和侵入性检查风险，避免只看单一指标。",
    ],
    "sleep": [
        "先固定起床时间、早晨光照、咖啡因截止时间和晚间降光，而不是直接堆叠补剂。",
        "区分入睡困难、早醒、夜间觉醒、昼夜节律问题和睡眠呼吸障碍。",
        "记录两周睡眠日志，用趋势判断干预是否有效。",
        "药物和补剂应有明确目标、时限和停用条件。",
    ],
    "fitness": [
        "把训练目标写成可观察能力：力量、心肺、柔韧性、疼痛减少或动作质量改善。",
        "优先做可持续的最低有效剂量，再逐步增加训练量和强度。",
        "把热身、渐进负荷、恢复和疼痛信号纳入计划，而不是只追求单次强度。",
        "受伤、放射痛或持续疼痛时，应先降低负荷并寻求专业评估。",
    ],
    "nutrition": [
        "优先优化整体饮食结构：高纤维、足量蛋白、低加工度、稳定进食时间。",
        "把血糖、血脂、体重、腰围、睡眠和饥饿感作为反馈，而不是只追求单一饮食标签。",
        "对补剂、极端饮食和快速减重方案保持证据门槛。",
        "代谢疾病、孕期、肾病或用药人群应先咨询医生或营养师。",
    ],
    "mental": [
        "把心理健康干预拆成日常基础动作：睡眠、运动、社交连接、书写和专业支持。",
        "区分普通压力、创伤反应、抑郁、焦虑和急性危机，不把所有痛苦都归为意志力不足。",
        "出现自伤念头、严重绝望或无法保证安全时，应立即寻求紧急帮助。",
        "把播客工具作为辅助，不替代心理治疗和精神科评估。",
    ],
    "pharmacology": [
        "先定义要解决的问题，再判断药物、补剂或新疗法是否匹配。",
        "机制合理不等于人体有效，动物研究或个案不能直接当成个人方案。",
        "关注剂量、来源、纯度、相互作用、长期风险和停用条件。",
        "涉及处方药、注射、激素、精神活性物质或灰色市场产品时，必须走专业医疗路径。",
    ],
    "genetics": [
        "先判断检测结果是否会改变筛查、治疗、家族沟通或生活策略。",
        "区分高外显率致病变异和概率性风险评分。",
        "把基因结果与家族史、真实指标和临床表现一起解读。",
        "对意义未明变异保持谨慎，不把消费者检测结果直接当诊断。",
    ],
    "relationship": [
        "优先观察真实互动、回应性、冲突处理和价值观，而不是只看抽象条件清单。",
        "用开放问题和共同活动建立信息，而不是依赖一次自我介绍。",
        "把社会支持、朋友反馈和长期行为模式纳入判断。",
        "涉及控制、羞辱、暴力或严重心理痛苦时，应优先考虑安全和专业支持。",
    ],
    "women": [
        "把症状、周期、疼痛、激素变化和生育计划一起记录，而不是孤立看单个指标。",
        "涉及生育、激素治疗、手术或辅助生殖时，尽早找对应专科评估。",
        "年龄、家族史、既往手术和基础疾病会改变决策时机。",
        "避免把社交媒体经验直接套用到个人诊疗。",
    ],
    "thinking": [
        "先写出具体假设，再寻找能推翻它的证据。",
        "区分相对风险、绝对风险、机制推理和临床结局。",
        "为每个健康决策定义成功指标和复盘时间。",
        "承认不确定性，不用单期节目替代系统证据。",
    ],
    "business": [
        "把嘉宾经验拆成可验证假设，而不是直接复制名人路径。",
        "先明确自己的阶段、资源、约束和风险承受力，再选择策略。",
        "用指标跟踪现金流、分发渠道、用户反馈、团队能力和个人能量。",
        "涉及投资、债务、股权和重大职业决策时，保留专业财务与法律判断边界。",
    ],
    "ai_future": [
        "区分技术能力、商业宣传、政策风险和个人可采取行动。",
        "先建立可迁移能力：判断力、写作、销售、产品理解、数据素养和学习速度。",
        "把 AI 工具纳入工作流时，记录节省时间、质量变化和失败场景。",
        "对就业、隐私、合规和安全风险保持预案，不把单一专家预测当定论。",
    ],
    "society": [
        "把宏观叙事拆成影响个人生活的具体变量：收入、职业、居住、健康、安全和关系。",
        "同时看多方观点和原始数据，避免被高情绪标题牵引。",
        "为不可控风险建立可控缓冲：现金流、技能、社群、健康和信息来源。",
        "政治、战争和经济判断不应用来替代个人财务、法律或安全专业建议。",
    ],
    "meaning": [
        "把嘉宾观点当成反思材料，而不是直接接受成个人信念。",
        "区分事实判断、价值判断和个人经历，避免把叙事当证据。",
        "用写作、对话和实际行动检验哪些价值观真正改善生活。",
        "涉及宗教、死亡、创伤或人生重大决策时，保留多元视角和专业支持边界。",
    ],
    "general": [
        "先把本期主题转化为一个具体、可执行的问题。",
        "从低风险、可持续、可测量的行动开始。",
        "保留原文链接和发布日期，后续更新时回到来源核验。",
        "涉及疾病、药物、筛查或治疗时寻求专业意见。",
    ],
}

HUBERMAN_SECTIONS = {
    "fast": "第1章：神经系统快速调节",
    "focus": "第2章：注意力与认知即时优化",
    "circadian": "第3章：生物钟同步与光照管理",
    "sleep": "第4章：睡眠科学与日循环整合",
    "energy": "第5章：全天能量与表现管理",
    "fitness": "第6章：科学健身与恢复周期",
    "nutrition": "第7章：营养与进食策略",
    "psych": "第8章：心理与认知周期",
    "learning": "第9章：神经可塑性与长期学习",
    "longevity": "第10章：健康延寿系统",
    "special": "第11章：特殊状况长期管理",
    "quality": "第12章：心理韧性与生活质量",
}

PETER_SECTIONS = {
    "metabolic": "第1章：能量代谢系统",
    "musculoskeletal": "第2章：肌肉骨骼系统",
    "cardio": "第3章：心血管系统",
    "neuroendocrine": "第4章：神经内分泌系统",
    "nutrition": "第5章：营养干预",
    "exercise": "第6章：运动与训练",
    "pharma": "第7章：补充剂与药物",
    "lifestyle": "第8章：环境与生活方式",
    "monitoring": "第9章：健康监测系统",
    "prevention": "第10章：疾病预防策略",
    "medical": "第11章：医疗系统导航",
    "risk": "第12章：个性化风险评估",
    "healthspan": "第13章：延长健康寿命",
    "psych": "第14章：心理韧性与社交健康",
    "integration": "第15章：系统性健康整合",
}

DIARY_OF_A_CEO_SECTIONS = {
    "health": "第1章：身体健康与长寿",
    "mental": "第2章：心理韧性与情绪调节",
    "relationship": "第3章：关系、亲密与沟通",
    "business": "第4章：事业、领导力与财富",
    "ai": "第5章：人工智能、科技与未来风险",
    "society": "第6章：社会、政治与系统风险",
    "meaning": "第7章：意义、信念与人生选择",
}

GENERATED_SIDEBAR_SECTIONS = [
    "续写更新：Huberman Lab 2025-08 之后",
    "续写更新：Peter Attia 2025-08 之后",
]

NEW_INDEX_LINKS = {
    "hubermanlab": "/hubermanlab/new",
    "peterattiamd": "/peterattiamd/new",
    "diaryofaceo": "/diaryofaceo/new",
}

NEW_INDEX_TITLES = {
    "hubermanlab": "Huberman Lab 新增内容（按原章节分类）",
    "peterattiamd": "The Peter Attia Drive 新增内容（按原章节分类）",
    "diaryofaceo": "The Diary Of A CEO 新增内容（按主题归类）",
}

NEW_INDEX_SIDEBAR_PLACEMENT: dict[str, str] = {}

SECTION_ORDERS = {
    "hubermanlab": list(HUBERMAN_SECTIONS.values()),
    "peterattiamd": list(PETER_SECTIONS.values()),
    "diaryofaceo": list(DIARY_OF_A_CEO_SECTIONS.values()),
}


def build_summary(ep: Episode) -> str:
    category = classify(ep.title, ep.description)
    topic_title = clean_title(ep.title)
    cn_title = localized_title_for_episode(ep)
    topics = ep.topics[:6]
    topic_lines = "\n".join(f"- {topic}" for topic in topics) if topics else "- 本期 RSS 未提供完整时间戳；请回到原文页面补充逐字稿或章节信息。"
    advice = ADVICE[category]
    advice_lines = "\n\n".join(
        f"{i}. **{label}**：{text}"
        for i, (label, text) in enumerate(
            [
                ("明确问题边界", advice[0]),
                ("优先低风险基础行动", advice[1]),
                ("建立记录与反馈", advice[2]),
                ("保留专业判断边界", advice[3]),
                ("回到来源核验", "本文只基于公开 RSS/show notes 自动整理，适合作为知识库草稿；重要决策应核对原节目、指南和专业意见。"),
            ],
            start=1,
        )
    )
    return f"""# {cn_title}

原文标题：{ep.title}

原文链接：{ep.link or "RSS 未提供官网链接"}

发布日期：{ep.published.isoformat()}

基于公开 RSS/show notes 自动整理。本文是 Health Art 停更后的补全文档草稿，不作为个人医疗建议。

## 确定行动指南

### 核心建议

{advice_lines}

### 实施要点

- 将本期内容归档到 `{TITLE_PREFIX[category]}` 主题下，并保留原始节目链接。
- 如果要转化为个人行动，先选择一个 2 周内可执行的小实验或一次专业咨询。
- 对涉及筛查、药物、补剂、激素、精神健康或疾病治疗的部分，不自行下诊断或调整治疗。
- 后续如果获得完整 transcript，可用本文作为骨架补充更细的证据、时间戳和引用。

## 核心解析

### 关键机制

1. **主题框架**：本期围绕 `{topic_title}` 展开，应先理解其解决的问题、适用人群和风险边界。

2. **证据层级**：播客讨论通常混合专家经验、机制研究、观察性数据和临床研究。写入知识库时，需要标注哪些是较稳健共识，哪些只是推测或早期证据。

3. **行动转化**：最可靠的转化方式不是复制单个建议，而是把建议变成可记录的行为、指标或就医问题。

4. **风险控制**：越是涉及高风险干预，越需要医生评估、实验室指标、随访计划和停用条件。

### 共识发现

- 公开 show notes 显示，本期重点不是孤立技巧，而是围绕一个健康/行为问题建立判断框架。
- 对普通读者，更适合先吸收低风险基础行动，再判断是否需要进一步检测或专业支持。
- 单期节目不能替代系统综述、临床指南或个体化医疗判断。

### 节目重点线索

{topic_lines}

## 深入视角

### 不确定区域

- 自动整理无法确认嘉宾每一句话的语境，尤其不能替代完整 transcript。
- RSS 摘要通常不会完整列出证据来源、研究设计和限制条件。
- 如果节目涉及新疗法、药物、补剂或筛查技术，真实风险收益需要回到临床研究和指南。

### 思维扩展

- 把这类播客作为“发现问题和建立问题清单”的入口，而不是最终答案。
- 每篇笔记最好继续补充三类信息：原始证据、适用人群、反例或禁忌。
- 对你的个人知识库而言，最有价值的是可复查、可更新、能连接到原始来源的结构。

### 个性化考量

- 年龄、性别、既往病史、用药、家族史和目标不同，会改变建议的优先级。
- 如果你想把本期内容用于个人健康决策，应先列出当前指标、症状和风险因素，再与专业人士讨论。
- 有急性症状、自伤风险、严重疼痛、异常出血、胸痛、神经症状或癌症警讯时，不应依赖知识库笔记，应及时就医。
"""


def generate_missing(episodes: list[Episode]) -> list[Path]:
    links = existing_links()
    written: list[Path] = []
    for ep in episodes:
        normalized_link = ep.link.rstrip("/")
        existing_path = links.get(normalized_link)
        if existing_path:
            if not existing_path.name.startswith("continuation_"):
                continue
            existing_text = existing_path.read_text(encoding="utf-8", errors="ignore")
            if AUTO_DRAFT_MARKER not in existing_text or not REFRESH_AUTO_DRAFTS:
                continue

        folder = ROOT / ep.source
        filename = f"continuation_{ep.published.isoformat()}_{link_slug(ep.link, ep.title)}.md"
        path = folder / filename
        if path.exists():
            existing_text = path.read_text(encoding="utf-8", errors="ignore")
            if AUTO_DRAFT_MARKER not in existing_text or not REFRESH_AUTO_DRAFTS:
                if normalized_link:
                    links[normalized_link] = path
                continue
        if path.exists() and not path.name.startswith("continuation_"):
            continue
        folder.mkdir(parents=True, exist_ok=True)
        path.write_text(build_summary(ep), encoding="utf-8")
        written.append(path)
        if normalized_link:
            links[normalized_link] = path
    return written


def title_from_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8", errors="ignore")
    title_match = re.search(r"^#\s+(.+)", text, flags=re.M)
    return title_match.group(1) if title_match else path.stem


def page_link(path: Path) -> str:
    return f"/{path.parent.name}/{path.stem}"


def markdown_cell(value: str) -> str:
    value = value.replace("|", "\\|")
    value = re.sub(r"\s+", " ", value).strip()
    return value


def local_title_for_source(source: str, path: Path) -> str:
    title = title_from_file(path)
    return title if source == "diaryofaceo" else f"【new】{title}"


def collect_episode_rows(episodes: list[Episode]) -> dict[str, list[tuple[Episode, Path, str]]]:
    links = existing_links()
    rows_by_source: dict[str, list[tuple[Episode, Path, str]]] = {source: [] for source in FEEDS}
    for ep in sorted(episodes, key=lambda item: item.published, reverse=True):
        path = links.get(ep.link.rstrip("/"))
        if not path:
            continue
        status = "续写页面" if path.name.startswith("continuation_") else "原有页面覆盖"
        rows_by_source[ep.source].append((ep, path, status))
    return rows_by_source


def section_rows_for_source(source: str, rows: list[tuple[Episode, Path, str]]) -> list[tuple[str, list[tuple[Episode, Path, str]]]]:
    groups: dict[str, list[tuple[Episode, Path, str]]] = {}
    for ep, path, status in rows:
        groups.setdefault(sidebar_section_for_episode(ep), []).append((ep, path, status))

    ordered_sections = [section for section in SECTION_ORDERS[source] if section in groups]
    ordered_sections.extend(section for section in groups if section not in ordered_sections)
    return [(section, groups[section]) for section in ordered_sections]


def generate_source_index(source: str, rows: list[tuple[Episode, Path, str]]) -> None:
    continuation_count = sum(1 for _, path, _ in rows if path.name.startswith("continuation_"))
    existing_count = len(rows) - continuation_count
    section_rows = section_rows_for_source(source, rows)
    framework_label = "主题框架" if source == "diaryofaceo" else "原项目章节框架"

    lines = [
        f"# {NEW_INDEX_TITLES[source]}",
        "",
        (
            f"本页把 `2025-08-02` 之后的 {SOURCE_LABELS[source]} RSS 条目放入{framework_label}中。"
            if source == "diaryofaceo"
            else f"本页把 `2025-08-02` 之后的 {SOURCE_LABELS[source]} RSS 条目放入{framework_label}中；每条新增内容均以 `【new】` 标注。"
        ),
        "",
        '<div class="continuation-stats">',
        f'  <div><strong>{len(rows)}</strong><span>RSS 条目</span></div>',
        f'  <div><strong>{continuation_count}</strong><span>续写页面</span></div>',
        f'  <div><strong>{existing_count}</strong><span>原有页面覆盖</span></div>',
        "</div>",
        "",
        "## 章节速览",
        "",
        "| 原章节 | 条目数 |",
        "| --- | ---: |",
    ]

    for section, section_items in section_rows:
        lines.append(f"| {markdown_cell(section)} | {len(section_items)} |")

    lines.append("")

    for section, section_items in section_rows:
        lines.extend(
            [
                f"## {section}",
                "",
                "| 日期 | 本地页面 | 原文 | 状态 |",
                "| --- | --- | --- | --- |",
            ]
        )
        for ep, path, status in section_items:
            local_title = markdown_cell(local_title_for_source(source, path))
            original_title = markdown_cell(clean_title(ep.title))
            lines.append(
                f"| {ep.published.isoformat()} | [{local_title}]({page_link(path)}) | [{original_title}]({ep.link}) | {status} |"
            )
        lines.append("")

    content = "\n".join(lines).rstrip() + "\n"
    (ROOT / source / "new.md").write_text(content, encoding="utf-8")


def generate_continuation_index(episodes: list[Episode]) -> None:
    rows_by_source = collect_episode_rows(episodes)
    for source, rows in rows_by_source.items():
        generate_source_index(source, rows)

    total_rss = len(episodes)
    total_pages = sum(len(rows) for rows in rows_by_source.values())
    continuation_count = sum(
        1
        for rows in rows_by_source.values()
        for _, path, _ in rows
        if path.name.startswith("continuation_")
    )
    existing_count = total_pages - continuation_count
    recent_rows = sorted(
        [row for rows in rows_by_source.values() for row in rows],
        key=lambda item: item[0].published,
        reverse=True,
    )[:16]

    lines = [
        "# 停更后续写总览",
        "",
        "本页由 `scripts/generate_continuation.py` 根据官方公开 RSS 和本地页面自动生成，用来进入 `2025-08-02` 之后的补全文档。",
        "",
        '<div class="continuation-stats">',
        f'  <div><strong>{total_rss}</strong><span>RSS 条目</span></div>',
        f'  <div><strong>{continuation_count}</strong><span>续写页面</span></div>',
        f'  <div><strong>{existing_count}</strong><span>原有页面覆盖</span></div>',
        "</div>",
        "",
        "## 分类入口",
        "",
    ]
    for source in NEW_INDEX_LINKS:
        lines.append(f"- [{NEW_INDEX_TITLES[source]}]({NEW_INDEX_LINKS[source]})。")
    lines.extend(
        [
            "",
            "## 最近新增",
            "",
            "| 日期 | 来源 | 本地页面 | 原文 | 状态 |",
            "| --- | --- | --- | --- | --- |",
        ]
    )

    for ep, path, status in recent_rows:
        local_title = markdown_cell(local_title_for_source(ep.source, path))
        original_title = markdown_cell(clean_title(ep.title))
        lines.append(
            f"| {ep.published.isoformat()} | {SOURCE_LABELS[ep.source]} | [{local_title}]({page_link(path)}) | [{original_title}]({ep.link}) | {status} |"
        )

    lines.extend(
        [
            "",
            "## 说明",
            "",
            "- Huberman Lab 与 Peter Attia 的分类页条目以 `【new】` 开头；The Diary Of A CEO 条目不显示该标签。",
            "- `续写页面` 是停更后新增整理稿；`原有页面覆盖` 表示原项目已有同原文链接页面，未重复生成。",
            "- 为避免前端卡顿，站点不再加载整站本地搜索索引；全文检索建议使用导出的本地知识库。",
            "",
            "## 数据来源",
            "",
        ]
    )
    for source, feed in FEEDS.items():
        lines.append(f"- {SOURCE_LABELS[source]} RSS：{feed}")
    lines.append("")

    (ROOT / "continuation.md").write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def contains_any(text: str, keywords: list[str]) -> bool:
    return any(keyword in text for keyword in keywords)


def target_huberman_section(ep: Episode) -> str:
    text = clean_title(ep.title).lower()
    if contains_any(text, ["light", "circadian", "vision", "visual", "eye", "hearing"]):
        return HUBERMAN_SECTIONS["circadian"]
    if contains_any(text, ["nutrition", "diet", "food", "fasting", "sugar", "taste", "gut", "micronutrient", "salt", "metabolic"]):
        return HUBERMAN_SECTIONS["nutrition"]
    if contains_any(text, ["exercise", "training", "muscle", "strength", "cardio", "movement", "posture", "flexibility", "physique", "sauna", "heat", "cooling"]):
        return HUBERMAN_SECTIONS["fitness"]
    if contains_any(text, ["sleep", "insomnia"]):
        return HUBERMAN_SECTIONS["sleep"]
    if contains_any(text, ["breathing", "immune", "cortisol", "burnout"]):
        return HUBERMAN_SECTIONS["fast"]
    if contains_any(text, ["attention", "focus", "decision", "workspace", "time perception", "productivity"]):
        return HUBERMAN_SECTIONS["focus"]
    if contains_any(text, ["learning", "memory", "plasticity", "language", "speech", "music", "play", "consciousness", "thought", "dopamine", "serotonin", "rewire", "neuroscience"]):
        return HUBERMAN_SECTIONS["learning"]
    if contains_any(text, ["aging", "longevity", "youthfulness", "mitochondria", "vitality", "lymphatic"]):
        return HUBERMAN_SECTIONS["longevity"]
    if contains_any(text, ["cancer", "stem cell", "autism", "epilepsy", "schizophrenia", "addiction", "therapy", "trauma", "pcos", "fertility", "hormone", "endometriosis", "breast", "screening", "peptide", "psychedelic", "compulsive"]):
        return HUBERMAN_SECTIONS["special"]
    if contains_any(text, ["emotion", "mindset", "gratitude", "habit", "self control", "procrastination", "aggression", "goal", "anxiety", "grief", "mental health", "confidence", "awe"]):
        return HUBERMAN_SECTIONS["psych"]
    if contains_any(text, ["relationship", "romantic", "partner", "attraction", "love", "desire", "attachment", "social", "masculinity", "male roles", "speak", "creative", "religion", "belief", "unbreakable"]):
        return HUBERMAN_SECTIONS["quality"]
    return HUBERMAN_SECTIONS["quality"]


def target_peter_section(ep: Episode) -> str:
    text = f"{ep.title} {ep.description}".lower()
    if contains_any(text, ["colorectal", "breast cancer", "prostate cancer", "screening", "cancer prevention"]):
        return PETER_SECTIONS["prevention"]
    if contains_any(text, ["apo", "lipid", "cholesterol", "cvd", "cardiovascular", "heart", "blood pressure", "obicetrapib"]):
        return PETER_SECTIONS["cardio"]
    if contains_any(text, ["genetic", "family history", "risk", "apoe"]):
        return PETER_SECTIONS["risk"]
    if contains_any(text, ["training", "exercise", "zone", "vo2", "cardiorespiratory", "strength", "athlete"]):
        return PETER_SECTIONS["exercise"]
    if contains_any(text, ["back pain", "injury", "musculoskeletal", "neurosurgery", "brain-computer", "glioblastoma"]):
        return PETER_SECTIONS["medical"]
    if contains_any(text, ["diet", "nutrition", "protein", "sugar", "fiber", "keto", "seed oil", "carnivore", "vegan", "mediterranean"]):
        return PETER_SECTIONS["nutrition"]
    if contains_any(text, ["medication", "supplement", "peptide", "tylenol", "drug", "pharmacology", "creatine", "aspirin", "nad"]):
        return PETER_SECTIONS["pharma"]
    if contains_any(text, ["sleep", "sauna", "gratitude", "habit"]):
        return PETER_SECTIONS["lifestyle"]
    if contains_any(text, ["hormone", "thyroid", "testosterone", "women", "fertility", "endometriosis", "sexual", "menopause"]):
        return PETER_SECTIONS["neuroendocrine"]
    if contains_any(text, ["metabolic", "glucose", "obesity", "mitochondria", "immune"]):
        return PETER_SECTIONS["metabolic"]
    if contains_any(text, ["aging clock", "dexa", "testing", "monitoring"]):
        return PETER_SECTIONS["monitoring"]
    if contains_any(text, ["longevity", "healthspan", "aging"]):
        return PETER_SECTIONS["healthspan"]
    if contains_any(text, ["happiness", "education", "mental", "trauma", "social"]):
        return PETER_SECTIONS["psych"]
    return PETER_SECTIONS["integration"]


def target_diaryofaceo_section(ep: Episode) -> str:
    title = clean_title(ep.title).lower()
    text = re.sub(r"https?://\S+", " ", f"{ep.title} {ep.description}".lower())
    society_terms = ["economy", "war", "politic", "president", "prime minister", "immigration", "democracy", "authoritarian", "middle class", "capitalism"]
    ai_terms = ["robot", "tech whistleblower", "google", "algorithm", "ai safety", "superintelligence"]
    business_terms = ["ceo", "entrepreneur", "business", "startup", "founder", "leadership", "money", "rich", "investor", "company", "management", "career"]
    relationship_terms = ["sexual", "relationship", "divorce", "dating", "partner", "marriage", "intimacy", "orgasm", "libido", "porn"]
    health_terms = ["sleep", "exercise", "creatine", "diet", "nutrition", "fatty liver", "liver", "diabetes", "hormone", "menopause", "aging", "longevity", "peptide", "protein", "alcohol", "pregnancy", "gut", "dementia", "insulin", "milk", "dairy", "fasting", "cancer"]
    mental_terms = ["trauma", "brain", "addiction", "anxiety", "vulnerability", "self esteem", "discipline", "anger", "limiting belief", "thoughts"]
    meaning_terms = ["christian", "god", "religion", "faith", "meaning", "purpose", "happiness", "buddhist", "spiritual"]

    if contains_any(title, society_terms):
        return DIARY_OF_A_CEO_SECTIONS["society"]
    if contains_ai_topic(title) or contains_any(title, ai_terms):
        return DIARY_OF_A_CEO_SECTIONS["ai"]
    if contains_any(title, business_terms):
        return DIARY_OF_A_CEO_SECTIONS["business"]
    if contains_any(title, relationship_terms):
        return DIARY_OF_A_CEO_SECTIONS["relationship"]
    if contains_any(title, health_terms):
        return DIARY_OF_A_CEO_SECTIONS["health"]
    if contains_any(title, mental_terms):
        return DIARY_OF_A_CEO_SECTIONS["mental"]
    if contains_any(title, meaning_terms):
        return DIARY_OF_A_CEO_SECTIONS["meaning"]

    if contains_any(text, health_terms):
        return DIARY_OF_A_CEO_SECTIONS["health"]
    if contains_any(text, mental_terms):
        return DIARY_OF_A_CEO_SECTIONS["mental"]
    if contains_any(text, relationship_terms):
        return DIARY_OF_A_CEO_SECTIONS["relationship"]
    if contains_ai_topic(text) or contains_any(text, ai_terms):
        return DIARY_OF_A_CEO_SECTIONS["ai"]
    if contains_any(text, business_terms):
        return DIARY_OF_A_CEO_SECTIONS["business"]
    if contains_any(text, society_terms):
        return DIARY_OF_A_CEO_SECTIONS["society"]
    if contains_any(text, meaning_terms):
        return DIARY_OF_A_CEO_SECTIONS["meaning"]
    return DIARY_OF_A_CEO_SECTIONS["meaning"]


def sidebar_section_for_episode(ep: Episode) -> str:
    if ep.source == "hubermanlab":
        return target_huberman_section(ep)
    if ep.source == "diaryofaceo":
        return target_diaryofaceo_section(ep)
    return target_peter_section(ep)


def find_balanced_end(text: str, start: int, open_ch: str, close_ch: str) -> int:
    depth = 0
    in_string = False
    escaped = False
    for i in range(start, len(text)):
        ch = text[i]
        if in_string:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == '"':
                in_string = False
            continue
        if ch == '"':
            in_string = True
        elif ch == open_ch:
            depth += 1
        elif ch == close_ch:
            depth -= 1
            if depth == 0:
                return i + 1
    raise RuntimeError(f"Could not find matching {close_ch}")


def find_object_bounds_for_marker(config: str, marker: str) -> tuple[int, int]:
    marker_pos = config.find(marker)
    if marker_pos == -1:
        raise ValueError(marker)
    start = config.rfind("{", 0, marker_pos)
    if start == -1:
        raise RuntimeError(f"Could not find object start for {marker}")
    return start, find_balanced_end(config, start, "{", "}")


def remove_object_at(config: str, start: int, end: int) -> str:
    left = start
    while left > 0 and config[left - 1] in " \t":
        left -= 1
    if left > 0 and config[left - 1] == ",":
        line_start = config.rfind("\n", 0, left - 1) + 1
        if config[line_start:left - 1].strip() == "":
            left = line_start
        else:
            left -= 1
    else:
        right = end
        while right < len(config) and config[right] in " \t":
            right += 1
        if right < len(config) and config[right] == ",":
            end = right + 1
    return config[:left] + config[end:]


def remove_generated_sections(config: str) -> str:
    for section in GENERATED_SIDEBAR_SECTIONS:
        marker = f'"text": "{section}"'
        while marker in config:
            start, end = find_object_bounds_for_marker(config, marker)
            config = remove_object_at(config, start, end)
    return config


def remove_sidebar_items_by_links(config: str, links: set[str]) -> str:
    for link in sorted(links, key=len, reverse=True):
        marker = f'"link": "{link}"'
        while marker in config:
            start, end = find_object_bounds_for_marker(config, marker)
            config = remove_object_at(config, start, end)
    return config


def remove_new_sidebar_items(config: str) -> str:
    marker = '"text": "【new】'
    while marker in config:
        start, end = find_object_bounds_for_marker(config, marker)
        config = remove_object_at(config, start, end)
    return config


def cleanup_empty_array_slots(config: str) -> str:
    previous = None
    while previous != config:
        previous = config
        config = re.sub(r"\n([ \t]*),\s*\n\s*,", r"\n\1,", config)
        config = re.sub(r"\n([ \t]*),\s*\n\s*\]", r"\n\1]", config)
    return config


def find_section_items_bounds(config: str, section_text: str) -> tuple[int, int]:
    marker = f'"text": "{section_text}"'
    marker_pos = config.find(marker)
    if marker_pos == -1:
        raise RuntimeError(f"Could not find sidebar section {section_text}")
    items_pos = config.find('"items": [', marker_pos)
    if items_pos == -1:
        raise RuntimeError(f"Could not find items for {section_text}")
    start = config.find("[", items_pos)
    return start, find_balanced_end(config, start, "[", "]")


def build_new_sidebar_item(source: str) -> dict[str, str]:
    return {"text": "【new】停更后新增内容（按原章节分类）", "link": NEW_INDEX_LINKS[source]}


def new_sidebar_groups() -> dict[str, list[dict[str, str]]]:
    groups: dict[str, list[dict[str, str]]] = {}
    for source, section in NEW_INDEX_SIDEBAR_PLACEMENT.items():
        groups.setdefault(section, []).append(build_new_sidebar_item(source))
    return groups


def insert_items_into_section(config: str, section_text: str, items: list[dict[str, str]]) -> str:
    if not items:
        return config
    start, end = find_section_items_bounds(config, section_text)
    existing_body = config[start + 1 : end - 1].rstrip()
    item_json = textwrap.indent(json.dumps(items, ensure_ascii=False, indent=2)[1:-1].strip(), "            ")
    if existing_body.strip():
        insertion = existing_body + "\n            ,\n" + item_json + "\n          "
    else:
        insertion = "\n" + item_json + "\n          "
    return config[: start + 1] + insertion + config[end - 1 :]


def build_episode_sidebar_items(source: str, section_items: list[tuple[Episode, Path, str]]) -> list[dict[str, str]]:
    return [
        {
            "text": local_title_for_source(source, path),
            "link": page_link(path),
        }
        for _, path, _ in section_items
    ]


def build_source_sidebar(source: str, rows: list[tuple[Episode, Path, str]]) -> list[dict[str, object]]:
    sidebar: list[dict[str, object]] = []
    for section, section_items in section_rows_for_source(source, rows):
        sidebar.append(
            {
                "collapsed": True,
                "text": section,
                "items": build_episode_sidebar_items(source, section_items),
            }
        )
    return sidebar


def replace_sidebar_block(config: str, key: str, sidebar: list[dict[str, object]]) -> str:
    marker = f"'{key}': ["
    marker_pos = config.find(marker)
    if marker_pos == -1:
        raise RuntimeError(f"Could not find sidebar block {key}")
    start = config.find("[", marker_pos)
    end = find_balanced_end(config, start, "[", "]")
    sidebar_json = json.dumps(sidebar, ensure_ascii=False, indent=2).replace("\n", "\n      ")
    return config[:start] + sidebar_json + config[end:]


def first_sidebar_link(source: str, rows: list[tuple[Episode, Path, str]]) -> str:
    for _, section_items in section_rows_for_source(source, rows):
        if section_items:
            return page_link(section_items[0][1])
    return NEW_INDEX_LINKS[source]


def write_diaryofaceo_landing(episodes: list[Episode]) -> None:
    rows = collect_episode_rows(episodes)["diaryofaceo"]
    first_link = first_sidebar_link("diaryofaceo", rows)
    source_path = ROOT / (first_link.lstrip("/") + ".md")
    if not source_path.exists():
        raise RuntimeError(f"Could not find Diary Of A CEO landing source {source_path}")
    (ROOT / "diaryofaceo" / "index.md").write_text(source_path.read_text(encoding="utf-8"), encoding="utf-8")


def replace_nav_link(config: str, text: str, link: str) -> str:
    pattern = re.compile(r"\{ text: '" + re.escape(text) + r"', link: '[^']+' \}")
    return pattern.sub("{ text: '" + text + "', link: '" + link + "' }", config)


def update_sidebar(episodes: list[Episode]) -> None:
    config_path = ROOT / ".vitepress" / "config.mts"
    config = config_path.read_text(encoding="utf-8")
    rows_by_source = collect_episode_rows(episodes)
    groups = new_sidebar_groups()
    config = remove_generated_sections(config)
    config = remove_new_sidebar_items(config)
    config = cleanup_empty_array_slots(config)
    for section_text, items in groups.items():
        config = insert_items_into_section(config, section_text, items)
    diary_sidebar = build_source_sidebar("diaryofaceo", rows_by_source["diaryofaceo"])
    config = replace_sidebar_block(config, "/diaryofaceo/", diary_sidebar)
    config = replace_nav_link(config, "Diary Of A CEO", first_sidebar_link("diaryofaceo", rows_by_source["diaryofaceo"]))
    config = cleanup_empty_array_slots(config)
    config_path.write_text(config, encoding="utf-8")


def main() -> None:
    copied = copy_handwritten_files()
    episodes = fetch_episodes()
    written = generate_missing(episodes)
    generate_continuation_index(episodes)
    write_diaryofaceo_landing(episodes)
    update_sidebar(episodes)
    print(f"Copied handwritten files: {len(copied)}")
    print(f"RSS episodes after cutoff: {len(episodes)}")
    print(f"Generated missing files: {len(written)}")
    for source in FEEDS:
        print(f"{SOURCE_LABELS[source]} continuation files: {len(list((ROOT / source).glob('continuation_*.md')))}")


if __name__ == "__main__":
    main()
