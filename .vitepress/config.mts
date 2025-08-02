import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Health Art",
  description: "深度总结Huberman Lab与Peter Attia播客精华，转化为实用的健康行动指南",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Huberman Lab', link: '/hubermanlab/healthy_breathing_techniques' },
      { text: 'Peter Attia', link: '/peterattiamd/metabolic_health_optimization_guide' },
      { text: '书籍解析', link: '/books/Outlive: The Science and Art of Longevity.md' },
      { text: '关于我们', link: '/about' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/healthart/website' }
    ],

    editLink: {
      pattern: 'https://github.com/healthart/website/edit/main/:path',
      text: '在Github上编辑该页面'
    },

    sidebar: {
      '/hubermanlab/': [
        {
          "collapsed": true,
          "text": "第1章：神经系统快速调节",
          "items": [
            {
              "text": "1. 如何正确呼吸，提升健康和表现",
              "link": "/hubermanlab/healthy_breathing_techniques"
            },
            {
              "text": "2. 控制压力，改善饮食、代谢与衰老：实用指南",
              "link": "/hubermanlab/stress_diet_aging_guide"
            },
            {
              "text": "3. 压力管理实用指南：从即时缓解到长期健康",
              "link": "/hubermanlab/stress_relief_guide"
            },
            {
              "text": "4. 应对压力：实用指南与科学工具",
              "link": "/hubermanlab/coping_with_stress_guide"
            },
            {
              "text": "5. 皮质醇与肾上腺素：优化能量和免疫系统的实用指南",
              "link": "/hubermanlab/cortisol_adrenaline_energy_guide"
            },
            {
              "text": "6. 适应原实用指南：科学支持的减压策略",
              "link": "/hubermanlab/stress_relief_strategies"
            },
            {
              "text": "7. 寒冷暴露的实用行动指南：改善健康与提升表现",
              "link": "/hubermanlab/cold_exposure_action_guide"
            },
            {
              "text": "8. 掌心降温：提升运动表现的实证指南",
              "link": "/hubermanlab/palm_cooling_performance_guide"
            },
            {
              "text": "9. 冷暴露对免疫系统的影响：实用指南",
              "link": "/hubermanlab/cold_exposure_immune_system_guide"
            },
            {
              "text": "10. 热暴露的健康实用指南：从科学到实践",
              "link": "/hubermanlab/heat_exposure_health_guide"
            },
            {
              "text": "11. 冷热暴露的实用指南：改善代谢和健康",
              "link": "/hubermanlab/cold_heat_exposure_health_guide"
            },
            {
              "text": "12. 疼痛管理实用指南：从医学专家角度解读",
              "link": "/hubermanlab/pain_management_practical_guide"
            },
            {
              "text": "13. 受伤与疼痛管理实用指南：大脑如何加速恢复",
              "link": "/hubermanlab/injury_pain_management_guide"
            },
            {
              "text": "14. 科学实证方法缓解头痛：行动指南",
              "link": "/hubermanlab/pain_relief_science_guide"
            },
            {
              "text": "15. 管理侵入性思维的实用指南",
              "link": "/hubermanlab/managing_intrusive_thoughts"
            },
            {
              "text": "16. 增强免疫系统的实用行动指南",
              "link": "/hubermanlab/immune_system_boost_guide"
            },
            {
              "text": "17. 强化免疫系统实用指南：阳光、温度与生活方式干预",
              "link": "/hubermanlab/boost_immune_system_guide"
            },
            {
              "text": "18. 有效管理压力、优化睡眠与提升专注力的科学指南",
              "link": "/hubermanlab/stress_management_sleep_focus_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第2章：注意力与认知即时优化",
          "items": [
            {
              "text": "1. 视觉聚焦技术：科学支持的目标达成策略",
              "link": "/hubermanlab/visual_focus_goal_strategy"
            },
            {
              "text": "2. 专注力与注意力提升指南：确定行动建议",
              "link": "/hubermanlab/focus_attention_improvement_guide"
            },
            {
              "text": "3. 音乐对大脑与身体的实用指南",
              "link": "/hubermanlab/music_brain_body_guide"
            },
            {
              "text": "4. 情绪智能提升实用指南：从认知到行动",
              "link": "/hubermanlab/emotional_intelligence_action_guide"
            },
            {
              "text": "5. 管理内心对话的实用指南：从想法到行动",
              "link": "/hubermanlab/managing_inner_dialogue"
            },
            {
              "text": "6. 冥想与意识探索：实用指南",
              "link": "/hubermanlab/meditation_consciousness_guide"
            },
            {
              "text": "7. 冥想的科学与实践：行动指南",
              "link": "/hubermanlab/meditation_science_practice_guide"
            },
            {
              "text": "8. 锻炼意志力：来自神经科学和超级耐力运动员的实用指南",
              "link": "/hubermanlab/willpower_training_practical_guide"
            },
            {
              "text": "9. 提升意志力与坚韧性的实用指南",
              "link": "/hubermanlab/boost_willpower_and_resilience"
            },
            {
              "text": "10. 任务切换与效率提升的实用指南",
              "link": "/hubermanlab/task_switching_efficiency_guide"
            },
            {
              "text": "11. 谈判与沟通艺术实用指南",
              "link": "/hubermanlab/negotiation_communication_guide"
            },
            {
              "text": "12. 思维模式对健康和表现的影响：实用指南",
              "link": "/hubermanlab/mindset_impact_on_health_performance"
            },
            {
              "text": "13. 思维拓展：医学视角下的思维与身体健康",
              "link": "/hubermanlab/mental_health_medical_perspective"
            },
            {
              "text": "14. 成长思维与压力增强策略：实用行动指南",
              "link": "/hubermanlab/growth_mindset_stress_management"
            },
            {
              "text": "15. 情绪与关系的科学：行动指南",
              "link": "/hubermanlab/emotional_relationship_science_guide"
            },
            {
              "text": "16. 情绪理解与管理实用指南：从神经科学角度看情绪",
              "link": "/hubermanlab/emotional_intelligence_practical_guide"
            },
            {
              "text": "17. 科学解读：理解与应对悲伤的实用指南",
              "link": "/hubermanlab/coping_with_grief"
            },
            {
              "text": "18. 情绪与营养关系：实用行动指南",
              "link": "/hubermanlab/emotions_nutrition_action_guide"
            },
            {
              "text": "19. 实用行动指南：科学证实的心理训练与可视化技术",
              "link": "/hubermanlab/mental_training_visualization_techniques"
            },
            {
              "text": "20. 创伤疗愈实用指南：从心理痛苦到行动方案",
              "link": "/hubermanlab/healing_from_trauma"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第3章：生物钟同步与光照管理",
          "items": [
            {
              "text": "1. 光照、温度与昼夜节律：优化睡眠、学习与代谢的实用指南",
              "link": "/hubermanlab/light_temperature_circadian_sleep_guide"
            },
            {
              "text": "2. 时差、轮班与失眠：睡眠周期调节实战指南",
              "link": "/hubermanlab/sleep_cycle_regulation_guide"
            },
            {
              "text": "3. 时间感知精准指南：利用生物节律与神经递质优化健康与表现",
              "link": "/hubermanlab/optimizing_biological_rhythms"
            },
            {
              "text": "4. 优化睡眠与清醒的实用指南",
              "link": "/hubermanlab/sleep_and_wakefulness_guide"
            },
            {
              "text": "5. 光照对健康的强效影响：从视力保护到荷尔蒙平衡的实用指南",
              "link": "/hubermanlab/light_health_practical_guide"
            },
            {
              "text": "6. 光照与身体节律：优化日常生活的实用指南",
              "link": "/hubermanlab/light_and_body_rhythm"
            },
            {
              "text": "7. 光照与精神健康：最新研究实用指南",
              "link": "/hubermanlab/light_and_mental_health"
            },
            {
              "text": "8. 光照、作息与健康：优化睡眠、能量和情绪的实用指南",
              "link": "/hubermanlab/light_sleep_health_guide"
            },
            {
              "text": "9. 时差倒时差与睡眠调整实用指南",
              "link": "/hubermanlab/jet_lag_sleep_guide"
            },
            {
              "text": "10. 睡眠与清醒优化：实用指南",
              "link": "/hubermanlab/sleep_wakefulness_optimization_guide"
            },
            {
              "text": "11. 全方位健康与生产力行动框架",
              "link": "/hubermanlab/health_and_productivity_action"
            },
            {
              "text": "12. 自然环境对健康的实用指南",
              "link": "/hubermanlab/healthy_natural_environment_guide"
            },
            {
              "text": "13. 视力健康实用指南：如何保护和增强视力",
              "link": "/hubermanlab/eye_health_protection_guide"
            },
            {
              "text": "14. 保护视力与改善视力的实用指南",
              "link": "/hubermanlab/protect_improve_vision_guide"
            },
            {
              "text": "15. 视觉系统与神经科技：从基础理解到实用应用",
              "link": "/hubermanlab/visual_neural_tech_applications"
            },
            {
              "text": "16. 用脑科学优化学习和创造力：实用行动指南",
              "link": "/hubermanlab/learning_optimization_practical_guide"
            },
            {
              "text": "17. [NEW] 保护视力与增强视觉功能的实用指南",
              "link": "/hubermanlab/eye_care_practical_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第4章：睡眠科学与日循环整合",
          "items": [
            {
              "text": "1. 睡眠的科学与实用指南：如何获得最佳休息",
              "link": "/hubermanlab/sleep_science_practical_guide"
            },
            {
              "text": "2. 睡眠科学实用指南：改善记忆、情绪和健康",
              "link": "/hubermanlab/sleep_science_practical_guide"
            },
            {
              "text": "3. 睡眠周期与学习情绪调节指南",
              "link": "/hubermanlab/sleep_cycle_learning_emotion_guide"
            },
            {
              "text": "4. 睡眠优化实用指南：来自睡眠科学家马特·沃克博士的建议",
              "link": "/hubermanlab/sleep_optimization_guide"
            },
            {
              "text": "5. 最佳睡眠优化实用指南：循证工具与实施要点",
              "link": "/hubermanlab/sleep_optimization_practical_guide"
            },
            {
              "text": "6. 睡眠与情绪健康：确定行动指南",
              "link": "/hubermanlab/sleep_and_emotional_health"
            },
            {
              "text": "7. 睡眠优化实用指南：强证据支持的行动建议",
              "link": "/hubermanlab/sleep_optimization_practical_guide"
            },
            {
              "text": "8. 如何优化深度睡眠：循证行动指南",
              "link": "/hubermanlab/improve_deep_sleep_guide"
            },
            {
              "text": "9. 睡眠提升学习与创造力的实用指南",
              "link": "/hubermanlab/sleep_learning_creativity_guide"
            },
            {
              "text": "10. 睡眠优化实用指南：调整时间与节律",
              "link": "/hubermanlab/sleep_optimization_guide"
            },
            {
              "text": "11. 医学内容实用指南：冷疗、皮肤健康与睡眠优化",
              "link": "/hubermanlab/cold_therapy_skin_sleep_guide"
            },
            {
              "text": "12. 提升睡眠质量与梦境体验的实用指南",
              "link": "/hubermanlab/improve_sleep_quality_guide"
            },
            {
              "text": "13. 实用指南：改善心理健康与身体健康的行动策略",
              "link": "/hubermanlab/mental_health_action_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第5章：全天能量与表现管理",
          "items": [
            {
              "text": "1. 科学优化大脑功能的实用指南",
              "link": "/hubermanlab/brain_function_optimization_guide"
            },
            {
              "text": "2. 优化大脑化学物质：提升健康与表现的实用指南",
              "link": "/hubermanlab/optimize_brain_chemistry"
            },
            {
              "text": "3. 科学塑造习惯指南：如何高效建立和打破习惯",
              "link": "/hubermanlab/habit_formation_guide"
            },
            {
              "text": "4. 饮水健康全指南：确定行动与核心解析",
              "link": "/hubermanlab/water_health_guide"
            },
            {
              "text": "5. 咖啡因使用指南：优化身心表现与健康",
              "link": "/hubermanlab/caffeine_usage_guide"
            },
            {
              "text": "6. 科学咖啡指南：优化摄入，最大化益处",
              "link": "/hubermanlab/science_coffee_guide"
            },
            {
              "text": "7. 深度工作的科学：提升专注力与生产力的实用指南",
              "link": "/hubermanlab/deep_work_focus_guide"
            },
            {
              "text": "8. 行动导向的决策与社交指南：从激素与状态研究中获得的实用洞见",
              "link": "/hubermanlab/action_oriented_decision_making_guide"
            },
            {
              "text": "9. 大脑奖励回路如何驱动你的选择",
              "link": "/hubermanlab/brain_reward_drives_choices"
            },
            {
              "text": "10. 多巴胺系统优化指南：提升动机、专注力与满足感",
              "link": "/hubermanlab/dopamine_optimization_guide"
            },
            {
              "text": "11. 多巴胺与持续动力：科学行动指南",
              "link": "/hubermanlab/dopamine_action_guide"
            },
            {
              "text": "12. 医学内容实用转化：驾驭动机与潜能的科学",
              "link": "/hubermanlab/medical_science_practical_transformation"
            },
            {
              "text": "13. 大脑健康实用指南：从 Huberman Lab 播客提炼的行动策略",
              "link": "/hubermanlab/brain_health_action_guide"
            },
            {
              "text": "14. 大脑和身体健康优化策略",
              "link": "/hubermanlab/brain_body_health_optimization"
            },
            {
              "text": "15. 身心实践的关键行动指南：聆听身体的智慧，培养自我照顾",
              "link": "/hubermanlab/body_wisdom_self_care_guide"
            },
            {
              "text": "16. 金钱心理学：实用指南",
              "link": "/hubermanlab/money_psychology_practical_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第6章：科学健身与恢复周期",
          "items": [
            {
              "text": "1. 基础健身方案：科学有效的时间平衡指南",
              "link": "/hubermanlab/basic_fitness_plan"
            },
            {
              "text": "2. 全面健身基础：行动导向的实用指南",
              "link": "/hubermanlab/comprehensive_fitness_guide"
            },
            {
              "text": "3. 运动训练实用指南：强化肌肉、预防伤害与长期健康",
              "link": "/hubermanlab/exercise_training_practical_guide"
            },
            {
              "text": "4. 实用指南：肌肉增长、力量提升与耐力训练的科学方法",
              "link": "/hubermanlab/muscle_training_scientific_guide"
            },
            {
              "text": "5. 健身全面评估指南：如何判断你的真实健康水平",
              "link": "/hubermanlab/fitness_assessment_guide"
            },
            {
              "text": "6. 实用健身方案设计指南：针对不同目标的训练策略",
              "link": "/hubermanlab/fitness_training_strategy_guide"
            },
            {
              "text": "7. 力量训练与耐力发展的科学方法",
              "link": "/hubermanlab/strength_and_endurance_training_guide"
            },
            {
              "text": "8. 力量与肌肉增长训练：实用指南",
              "link": "/hubermanlab/strength_muscle_growth_guide"
            },
            {
              "text": "9. 肌肉健康与训练的实用指南",
              "link": "/hubermanlab/muscle_training_guide"
            },
            {
              "text": "10. 肌肉健康：长寿的核心器官",
              "link": "/hubermanlab/muscle_health_longevity_key"
            },
            {
              "text": "11. 力量训练与激素优化实用指南",
              "link": "/hubermanlab/strength_training_hormone_guide"
            },
            {
              "text": "12. 性激素优化实用指南：基于证据的行动建议",
              "link": "/hubermanlab/hormone_optimization_guide"
            },
            {
              "text": "13. 提升心肺健康与最大摄氧量(VO2 max)的实用指南",
              "link": "/hubermanlab/cardio_fitness_training_guide"
            },
            {
              "text": "14. 科学指南：提升身体与大脑耐力的4种方法",
              "link": "/hubermanlab/brain_endurance_boosting_methods"
            },
            {
              "text": "15. 提升耐力与促进脂肪燃烧的实用指南",
              "link": "/hubermanlab/endurance_fat_burning_guide"
            },
            {
              "text": "16. 健身训练实用指南：循证策略和行动方案",
              "link": "/hubermanlab/fitness_training_practical_guide"
            },
            {
              "text": "17. 提高灵活性的实用指南：基于研究的有效拉伸方法",
              "link": "/hubermanlab/flexibility_stretching_guide"
            },
            {
              "text": "18. 跑动与跳跃的实用指南：提升速度、灵活性与长寿",
              "link": "/hubermanlab/running_jumping_practical_guide"
            },
            {
              "text": "19. 改善运动能力与姿势的实用指南",
              "link": "/hubermanlab/improve_movement_and_posture"
            },
            {
              "text": "20. 运动增强大脑健康与认知表现：实用指南",
              "link": "/hubermanlab/exercise_for_brain_health"
            },
            {
              "text": "21. 强壮无痛的背部：循证实践指南",
              "link": "/hubermanlab/strong_pain_free_back"
            },
            {
              "text": "22. 强化和保护脊椎的实用行动指南",
              "link": "/hubermanlab/spine_protection_action_guide"
            },
            {
              "text": "23. 恢复优化指南：将科学转化为实际行动",
              "link": "/hubermanlab/recovery_optimization_guide"
            },
            {
              "text": "24. [NEW] 肌肉增长与力量提升：科学指南",
              "link": "/hubermanlab/muscle_growth_scientific_guide"
            },
            {
              "text": "25. [NEW] 耐力训练实用指南：从科学到行动",
              "link": "/hubermanlab/endurance_training_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第7章：营养与进食策略",
          "items": [
            {
              "text": "1. 时间限制进食的实用指南：如何优化饮食时间改善健康",
              "link": "/hubermanlab/time_restricted_eating_guide"
            },
            {
              "text": "2. 时间限制饮食指南：改善健康与代谢的实用方案",
              "link": "/hubermanlab/time_restricted_eating_guide"
            },
            {
              "text": "3. 确定行动指南：循证健康营养与训练策略",
              "link": "/hubermanlab/evidence_based_health_strategies"
            },
            {
              "text": "4. 科学饮食指南：健康、减脂与增肌的实用策略",
              "link": "/hubermanlab/healthy_eating_strategies"
            },
            {
              "text": "5. 科学指南：控制饥饿感与健康饮食的实用策略",
              "link": "/hubermanlab/control_hunger_healthy_eating"
            },
            {
              "text": "6. 控制饥饿与饱腹感的科学指南",
              "link": "/hubermanlab/hunger_control_guide"
            },
            {
              "text": "7. 确定行动指南：改善代谢健康的核心策略",
              "link": "/hubermanlab/metabolism_improvement_strategies"
            },
            {
              "text": "8. 科学方法控制糖分摄入与代谢：实用指南",
              "link": "/hubermanlab/controlling_sugar_intake_metabolism"
            },
            {
              "text": "9. 味觉和糖瘾的科学：实用行动指南",
              "link": "/hubermanlab/taste_and_sugar_addiction_guide"
            },
            {
              "text": "10. 高糖饮食的健康风险与实用改善方案",
              "link": "/hubermanlab/high_sugar_diet_risks_solutions"
            },
            {
              "text": "11. 饮水健康全指南：确定行动与核心解析",
              "link": "/hubermanlab/water_health_guide"
            },
            {
              "text": "12. 强证据支持的健康行动指南：改善肠道，大脑和身体健康",
              "link": "/hubermanlab/gut_brain_health_guide"
            },
            {
              "text": "13. 肠道健康优化实用指南：发酵食品与膳食纤维的力量",
              "link": "/hubermanlab/gut_health_optimization_guide"
            },
            {
              "text": "14. 肠道-大脑健康优化指南：基于哈伯曼实验室播客的实用建议",
              "link": "/hubermanlab/gut_brain_health_optimization_guide"
            },
            {
              "text": "15. 肠道感知系统：实用指南",
              "link": "/hubermanlab/intestinal_sensing_guide"
            },
            {
              "text": "16. 大脑健康与认知表现的营养策略",
              "link": "/hubermanlab/brain_nutrition_cognitive_performance"
            },
            {
              "text": "17. 营养与补充剂优化指南：从播客深度解析到行动策略",
              "link": "/hubermanlab/nutrition_supplement_optimization_guide"
            },
            {
              "text": "18. 补充剂合理使用指南：从科学到实践",
              "link": "/hubermanlab/supplement_usage_guide"
            },
            {
              "text": "19. 食物如何影响大脑：让精神健康从营养开始改变",
              "link": "/hubermanlab/brain_nutrition_mental_health"
            },
            {
              "text": "20. 健康饮食与进食障碍的实用指南",
              "link": "/hubermanlab/healthy_eating_guide"
            },
            {
              "text": "21. 酒精对健康的影响：实用行动指南",
              "link": "/hubermanlab/alcohol_health_impact_guide"
            },
            {
              "text": "22. 饮用水中的氟化物：科学事实与实用建议",
              "link": "/hubermanlab/drinking_water_fluoride_guide"
            },
            {
              "text": "23. 情绪与营养关系：实用行动指南",
              "link": "/hubermanlab/emotions_nutrition_action_guide"
            },
            {
              "text": "24. [NEW] 蛋白质选择实用指南：乳清蛋白、胶原蛋白与骨汤",
              "link": "/hubermanlab/protein_choice_practical_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第8章：心理与认知周期",
          "items": [
            {
              "text": "1. 优化大脑塑性与学习的实用指南",
              "link": "/hubermanlab/brain_plasticity_learning_guide"
            },
            {
              "text": "2. 技能快速掌握：医学视角下的行动指南",
              "link": "/hubermanlab/rapid_medical_skill_acquisition"
            },
            {
              "text": "3. 提高专注力的实用指南：科学证实的方法",
              "link": "/hubermanlab/focus_improvement_guide"
            },
            {
              "text": "4. 优化多巴胺，战胜拖延症",
              "link": "/hubermanlab/optimize_dopamine_beat_procrastination"
            },
            {
              "text": "5. 多巴胺与动机管理：从理论到实践指南",
              "link": "/hubermanlab/dopamine_motivation_management"
            },
            {
              "text": "6. 目标设定与实现的实用指南",
              "link": "/hubermanlab/goal_setting_practical_guide"
            },
            {
              "text": "7. 行为科学与目标设置：实用指南",
              "link": "/hubermanlab/goal_setting_practical_guide"
            },
            {
              "text": "8. 目标设定与执行的神经科学实战指南",
              "link": "/hubermanlab/goal_setting_neural_guide"
            },
            {
              "text": "9. 实用行动指南：神经科学视角下的身心健康",
              "link": "/hubermanlab/mind_body_wellness_guide"
            },
            {
              "text": "10. 大脑管理与人生导航：从神经科学角度提升自我",
              "link": "/hubermanlab/brain_management_life_navigation"
            },
            {
              "text": "11. 创伤日记疗法：改善心理和身体健康的实证方案",
              "link": "/hubermanlab/healing_through_writing"
            },
            {
              "text": "12. 营养支持脑部健康与脑损伤恢复的实用指南",
              "link": "/hubermanlab/brain_health_recovery_guide"
            },
            {
              "text": "13. 血管加压素与自闭症：社交功能的新视角",
              "link": "/hubermanlab/vasopressin_and_autism_perspective"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第9章：神经可塑性与长期学习",
          "items": [
            {
              "text": "1. 大脑潜能激发指南：从神经科学到行动策略",
              "link": "/hubermanlab/brain_potential_activation_guide"
            },
            {
              "text": "2. 优化大脑可塑性：通过错误、动作和平衡加速学习",
              "link": "/hubermanlab/brain_plasticity_learning_optimization"
            },
            {
              "text": "3. 学习与神经可塑性：错误、平衡与动作的关键作用",
              "link": "/hubermanlab/learning_through_neural_plasticity"
            },
            {
              "text": "4. 大脑可塑性与成长型思维：提升表现的实用指南",
              "link": "/hubermanlab/brain_plasticity_growth_mindset_guide"
            },
            {
              "text": "5. 神经可塑性优化指南：大脑变化的科学与实践",
              "link": "/hubermanlab/neuroplasticity_optimization_guide"
            },
            {
              "text": "6. 大脑可塑性实践指南：科学提升注意力与学习效率",
              "link": "/hubermanlab/brain_plasticity_learning_guide"
            },
            {
              "text": "7. 大脑记忆与认知增强的实用指南",
              "link": "/hubermanlab/memory_enhancement_practical_guide"
            },
            {
              "text": "8. 优化大脑学习与认知功能的实用指南",
              "link": "/hubermanlab/brain_learning_optimization_guide"
            },
            {
              "text": "9. 优化认知功能与大脑健康：实用指南",
              "link": "/hubermanlab/brain_health_practical_guide"
            },
            {
              "text": "10. 有效学习的实用指南：科学支持的学习策略",
              "link": "/hubermanlab/effective_learning_strategies"
            },
            {
              "text": "11. 优化记忆的实用指南：科学证实的记忆增强方法",
              "link": "/hubermanlab/memory_optimization_practical_guide"
            },
            {
              "text": "12. 提升记忆力与专注力的科学行动指南",
              "link": "/hubermanlab/memory_focus_science_guide"
            },
            {
              "text": "13. 创意过程的实用指南：从对话中提炼的关键行动建议",
              "link": "/hubermanlab/creative_process_practical_guide"
            },
            {
              "text": "14. 情绪与学习的互动：从科学到实践行动指南",
              "link": "/hubermanlab/emotion_learning_interaction_guide"
            },
            {
              "text": "15. 语言学习和语言障碍实用指南",
              "link": "/hubermanlab/language_learning_disability_guide"
            },
            {
              "text": "16. 跨代遗传与环境影响：基因如何传递记忆",
              "link": "/hubermanlab/transgenerational_genetic_memory"
            },
            {
              "text": "17. [NEW] 技能学习的科学：高效掌握新技能的实用指南",
              "link": "/hubermanlab/mastering_new_skills_guide"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第10章：健康延寿系统",
          "items": [
            {
              "text": "1. 最有效延长寿命和提升生活质量的行动指南",
              "link": "/hubermanlab/health_longevity_action_guide"
            },
            {
              "text": "2. 长寿补充剂实用指南：科学证据与实际建议",
              "link": "/hubermanlab/longevity_supplement_practical_guide"
            },
            {
              "text": "3. NAD 与长寿：实用指南",
              "link": "/hubermanlab/nad_longevity_guide"
            },
            {
              "text": "4. 实用医学指南：哈伯曼实验室播客关键行动要点",
              "link": "/hubermanlab/practical_medical_guidance"
            },
            {
              "text": "5. 长寿与健康生活实用指南：从医学对话到行动方案",
              "link": "/hubermanlab/longevity_health_practical_guide"
            },
            {
              "text": "6. 衰老放缓与逆转：科学支持的行动指南",
              "link": "/hubermanlab/aging_reversal_scientific_guide"
            },
            {
              "text": "7. 科学化脂肪燃烧指南：从神经系统到实用策略",
              "link": "/hubermanlab/fat_burning_science_guide"
            },
            {
              "text": "8. 大脑健康与神经增强：从神经外科手术到脑机接口的实用见解",
              "link": "/hubermanlab/brain_health_neural_enhancement"
            },
            {
              "text": "9. 社交互动与大脑健康：实用指南",
              "link": "/hubermanlab/social_interaction_brain_health"
            },
            {
              "text": "10. 中风的行动指南：预防、康复和大脑健康",
              "link": "/hubermanlab/stroke_prevention_and_recovery"
            },
            {
              "text": "11. 身体健康与生活质量优化指南：从睡眠到训练的实用行动",
              "link": "/hubermanlab/healthy_lifestyle_optimization_guide"
            },
            {
              "text": "12. 视力健康实用指南：确保清晰视界的行动方案",
              "link": "/hubermanlab/eye_health_action_guide"
            },
            {
              "text": "13. 口腔健康：关键行动指南",
              "link": "/hubermanlab/oral_health_key_actions"
            },
            {
              "text": "14. 健康头发维持与再生实用指南：循证方法",
              "link": "/hubermanlab/hair_growth_practical_guide"
            },
            {
              "text": "15. 皮肤健康与保护实用指南",
              "link": "/hubermanlab/skin_health_protection_guide"
            },
            {
              "text": "16. 皮肤健康与护理实用指南：从科学到行动",
              "link": "/hubermanlab/skin_care_practical_guide"
            },
            {
              "text": "17. 微塑料与健康：科学证据与实用对策",
              "link": "/hubermanlab/microplastic_health_evidence_solutions"
            },
            {
              "text": "18. 确定行动指南：保护你的激素健康与生育能力",
              "link": "/hubermanlab/protecting_hormonal_health"
            },
            {
              "text": "19. 激素健康优化实用指南：从生活方式到补充剂",
              "link": "/hubermanlab/hormone_health_optimization_guide"
            },
            {
              "text": "20. 激素与性发育：实用行动指南",
              "link": "/hubermanlab/hormonal_and_sexual_development_guide"
            },
            {
              "text": "21. 肽疗法与激素疗法实用指南：健康、表现与长寿",
              "link": "/hubermanlab/peptide_hormone_therapy_guide"
            },
            {
              "text": "22. 甲状腺激素与生长激素优化指南：提升代谢健康的实用策略",
              "link": "/hubermanlab/thyroid_growth_hormone_optimization"
            },
            {
              "text": "23. 男性激素优化实用指南",
              "link": "/hubermanlab/hormone_optimization_for_men"
            },
            {
              "text": "24. 提升男性性健康的实用指南",
              "link": "/hubermanlab/men_health_improvement_guide"
            },
            {
              "text": "25. 冷暖交替对生殖健康的影响：实用指南",
              "link": "/hubermanlab/temperature_impact_on_reproductive_health"
            },
            {
              "text": "26. 女性荷尔蒙健康优化指南：从科学到实践",
              "link": "/hubermanlab/female_hormone_health_guide"
            },
            {
              "text": "27. 女性荷尔蒙健康与生育能力实用指南",
              "link": "/hubermanlab/fertility_hormone_guide"
            },
            {
              "text": "28. 优化生育力的实用指南：从生物学机制到具体行动",
              "link": "/hubermanlab/fertility_optimization_practical_guide"
            },
            {
              "text": "29. 性健康与盆底功能的实用指南",
              "link": "/hubermanlab/pelvic_health_practical_guide"
            },
            {
              "text": "30. 预防和应对感冒流感的行动指南",
              "link": "/hubermanlab/cold_flu_prevention_guide"
            },
            {
              "text": "31. 冬季呼吸道疾病防护实用指南",
              "link": "/hubermanlab/winter_respiratory_disease_protection"
            },
            {
              "text": "32. 强化免疫系统实用指南：阳光、温度与生活方式干预",
              "link": "/hubermanlab/boost_immune_system_guide"
            },
            {
              "text": "33. 革命性细胞科学研究：医学突破与健康应用实用指南",
              "link": "/hubermanlab/revolutionary_cell_research_guide"
            },
            {
              "text": "34. 医学实用指南：从播客研究中提取关键行动建议",
              "link": "/hubermanlab/medical_practice_guide"
            },
            {
              "text": "35. 人工智能与医疗保健的实用指南",
              "link": "/hubermanlab/ai_healthcare_guide"
            },
            {
              "text": "36. 安慰剂效应的力量：如何利用信念改善健康",
              "link": "/hubermanlab/power_of_placebo_effect"
            },
            {
              "text": "37. 实用医学指南：从Huberman's Lab播客中获取优质行动建议",
              "link": "/hubermanlab/practical_medical_advice"
            },
            {
              "text": "38. 全方位健康与生产力行动框架",
              "link": "/hubermanlab/health_and_productivity_action"
            },
            {
              "text": "39. 从生活幸福到健康长寿：实用指南",
              "link": "/hubermanlab/happy_life_longevity_guide"
            },
            {
              "text": "40. 实用健康指南：从里克·鲁宾的习惯中获取最大收益",
              "link": "/hubermanlab/health_habits_maximum_benefits"
            },
            {
              "text": "41. [NEW] 口腔健康实用指南：从牙齿护理到全身健康",
              "link": "/hubermanlab/oral_health_practical_guide"
            },
            {
              "text": "42. [NEW] 科学减脂实用指南：利用神经系统最大化脂肪燃烧",
              "link": "/hubermanlab/fat_burning_science_guide_nervous_maximized"
            },
            {
              "text": "43. [NEW] 功能医学与健康优化实用指南",
              "link": "/hubermanlab/functional_medicine_health_optimization_guide"
            },
            {
              "text": "44. [NEW] 嗅觉、味觉与化学感知：实用行动指南",
              "link": "/hubermanlab/smell_taste_chemical_perception"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第11章：特殊状况长期管理",
          "items": [
            {
              "text": "1. ADHD管理实用指南：强化注意力的关键策略",
              "link": "/hubermanlab/adhd_attention_management_strategies"
            },
            {
              "text": "2. 注意力缺陷多动障碍(ADHD)药物治疗实用指南",
              "link": "/hubermanlab/adhd_medication_treatment_guide"
            },
            {
              "text": "3. 智能手机对青少年心理健康的影响：行动指南",
              "link": "/hubermanlab/smartphone_impact_youth_mental_health"
            },
            {
              "text": "4. 抑郁症管理：实用指南",
              "link": "/hubermanlab/depression_management_guide"
            },
            {
              "text": "5. 氯胺酮治疗抑郁症：循证实用指南",
              "link": "/hubermanlab/ketamine_depression_treatment_guide"
            },
            {
              "text": "6. PTSD治疗与管理：实用指南",
              "link": "/hubermanlab/ptsd_treatment_management_guide"
            },
            {
              "text": "7. 创伤恢复与心理健康实用指南：从军人经验中汲取的洞见",
              "link": "/hubermanlab/recovery_from_trauma_guide"
            },
            {
              "text": "8. MDMA治疗PTSD：实用指南与机制解析",
              "link": "/hubermanlab/mdma_ptsd_treatment_guide"
            },
            {
              "text": "9. 高冲突人格：识别与应对策略",
              "link": "/hubermanlab/high_conflict_personality_strategies"
            },
            {
              "text": "10. 精神健康与心灵探索：精神活性物质治疗的科学指南",
              "link": "/hubermanlab/mental_health_substance_guide"
            },
            {
              "text": "11. 西洛西宾（psilocybin）的治疗潜力与实用指南",
              "link": "/hubermanlab/psychedelic_therapy_guide"
            },
            {
              "text": "12. 精神心理用途的迷幻药物：实用指南",
              "link": "/hubermanlab/psychedelic_drug_usage_guide"
            },
            {
              "text": "13. 大麻的实用指南：科学、风险和使用建议",
              "link": "/hubermanlab/cannabis_usage_guide"
            },
            {
              "text": "14. 大麻对大脑和身体的影响：实用指南",
              "link": "/hubermanlab/cannabis_effects_on_body_brain"
            },
            {
              "text": "15. 阿片类物质卡痛（Kratom）安全指南：证据与行动建议",
              "link": "/hubermanlab/kratom_safety_guide"
            },
            {
              "text": "16. 肽类治疗：实用指南与科学解析",
              "link": "/hubermanlab/peptide_therapy_guide"
            },
            {
              "text": "17. 临床催眠术：医学健康管理的实用指南",
              "link": "/hubermanlab/clinical_hypnosis_practical_guide"
            },
            {
              "text": "18. 青少年尼古丁和大麻使用：行动指南",
              "link": "/hubermanlab/youth_nicotine_cannabis_guide"
            },
            {
              "text": "19. 女性健康与训练实用指南：营养、力量与荷尔蒙平衡",
              "link": "/hubermanlab/women_training_health_guide"
            },
            {
              "text": "20. 更年期实用指南：最大化健康与活力的行动方案",
              "link": "/hubermanlab/menopause_health_guide"
            },
            {
              "text": "21. 骨折恢复与运动伤病管理实用指南",
              "link": "/hubermanlab/fracture_recovery_sports_injury_guide"
            },
            {
              "text": "22. 伤痛康复与神经可塑性实用指南",
              "link": "/hubermanlab/pain_recovery_neuroplasticity_guide"
            },
            {
              "text": "23. 疼痛管理实用指南：从医学专家角度解读",
              "link": "/hubermanlab/pain_management_practical_guide"
            },
            {
              "text": "24. 科学实证方法缓解头痛：行动指南",
              "link": "/hubermanlab/pain_relief_science_guide"
            },
            {
              "text": "25. 气味与健康的实用指南：嗅觉如何影响我们的生活",
              "link": "/hubermanlab/scent_health_practical_guide"
            },
            {
              "text": "26. 中风的行动指南：预防、康复和大脑健康",
              "link": "/hubermanlab/stroke_prevention_and_recovery"
            },
            {
              "text": "27. [NEW] 通过代谢和线粒体健康改善心理健康的实用指南",
              "link": "/hubermanlab/mental_health_metabolism_guide"
            },
            {
              "text": "28. [NEW] 实用指南：克服成瘾的关键行动步骤",
              "link": "/hubermanlab/overcoming_addiction_key_steps"
            }
          ]
        },
        {
          "collapsed": true,
          "text": "第12章：心理韧性与生活质量",
          "items": [
            {
              "text": "1. 如何培养心理韧性与能量管理的实用指南",
              "link": "/hubermanlab/mental_resilience_energy_guide"
            },
            {
              "text": "2. 实用行动指南：《艺术学习与生活》的核心洞见",
              "link": "/hubermanlab/art_learning_life_insights"
            },
            {
              "text": "3. 理解和评估心理健康的实用指南",
              "link": "/hubermanlab/mental_health_practical_guide"
            },
            {
              "text": "4. 心理健康自我照顾实用指南",
              "link": "/hubermanlab/mental_health_self_care_guide"
            },
            {
              "text": "5. 构建心理健康实用指南：了解驱动力与自我觉察",
              "link": "/hubermanlab/mental_health_practical_guide"
            },
            {
              "text": "6. 内心家庭系统疗法（IFS）的实用指南：从情绪困扰到内在和谐",
              "link": "/hubermanlab/ifs_guide_to_inner_harmony"
            },
            {
              "text": "7. 动机与奖励系统优化指南：提升驱动力的实用策略",
              "link": "/hubermanlab/motivation_reward_system_optimization"
            },
            {
              "text": "8. 面向未来的思维：从短期专注到长远行动的转变",
              "link": "/hubermanlab/future_thinking_mindset_shift"
            },
            {
              "text": "9. 对抗生活中的愤世嫉俗：从信任到健康的实用指南",
              "link": "/hubermanlab/fighting_cynicism_practical_guide"
            },
            {
              "text": "10. 健康关系的基础：从自我了解到有效链接",
              "link": "/hubermanlab/self_awareness_to_healthy_connections"
            },
            {
              "text": "11. 培养健康亲子关系的实用指南",
              "link": "/hubermanlab/healthy_parenting_guide"
            },
            {
              "text": "12. 育儿与情绪调节的实用指南：从挫折到能力培养",
              "link": "/hubermanlab/parenting_emotion_regulation_guide"
            },
            {
              "text": "13. 公共健康关键措施：确切行动指南",
              "link": "/hubermanlab/public_health_action_guide"
            },
            {
              "text": "14. 成人玩耍指南：从科学证据到实用行动",
              "link": "/hubermanlab/adult_play_guide"
            },
            {
              "text": "15. 科学支持的幸福增强策略：强证据行动指南",
              "link": "/hubermanlab/happiness_enhancement_strategies"
            },
            {
              "text": "16. 科学验证的幸福行动指南：从情绪体验到生活满足感",
              "link": "/hubermanlab/happiness_actions_research_guide"
            },
            {
              "text": "17. 深度理解自我与意义：从心理学视角转化为实践指南",
              "link": "/hubermanlab/finding_meaning_through_self_reflection"
            },
            {
              "text": "18. [NEW] 关系健康实用指南：从感受识别到行为改变",
              "link": "/hubermanlab/relationship_health_practical_guide"
            },
            {
              "text": "19. [NEW] 宠物福利实用指南：基于动物行为学的科学建议",
              "link": "/hubermanlab/pet_welfare_scientific_guide"
            }
          ]
        }
      ],
      '/peterattiamd/': [
        {
          "text": "第1章：能量代谢系统",
          "collapsed": true,
          "items": [
            {
              "text": "A. 代谢系统基础理解",
              "items": [
                {
                  "text": "代谢健康优化全面指南",
                  "link": "/peterattiamd/metabolic_health_optimization_guide"
                },
                {
                  "text": "代谢优化指南",
                  "link": "/peterattiamd/nad_metabolism_cancer_guide"
                },
                {
                  "text": "线粒体健康行动指南",
                  "link": "/peterattiamd/mitochondria_health_longevity_guide"
                },
                {
                  "text": "慢性炎症管理完整指南",
                  "link": "/peterattiamd/reduce_chronic_inflammation"
                }
              ]
            },
            {
              "text": "B. 胰岛素与血糖管理",
              "items": [
                {
                  "text": "胰岛素抵抗全方位指南",
                  "link": "/peterattiamd/insulin_resistance_practical_guide_2"
                },
                {
                  "text": "血糖管理指南",
                  "link": "/peterattiamd/blood_sugar_management_guide"
                },
                {
                  "text": "胰岛素抵抗实用指南",
                  "link": "/peterattiamd/insulin_resistance_practical_guide"
                },
                {
                  "text": "血糖优化实用指南",
                  "link": "/peterattiamd/blood_glucose_exercise_guide"
                },
                {
                  "text": "胰岛素抵抗与代谢健康实战指南",
                  "link": "/peterattiamd/metabolic_health_guide"
                },
                {
                  "text": "胰岛素抵抗与2型糖尿病管理多器官八重奏模型",
                  "link": "/peterattiamd/insulin_resistance_diabetes_guide"
                }
              ]
            },
            {
              "text": "C. 代谢监测与评估",
              "items": [
                {
                  "text": "代谢健康监测指南",
                  "link": "/peterattiamd/evidence_based_medical_diagnosis"
                },
                {
                  "text": "身体成分与胰岛素敏感性双管齐下策略",
                  "link": "/peterattiamd/body_composition_insulin_resistance_guide"
                }
              ]
            },
            {
              "text": "D. 细胞能量系统",
              "items": [
                {
                  "text": "线粒体代谢健康指南",
                  "link": "/peterattiamd/mitochondria_metabolism_guide"
                },
                {
                  "text": "乳酸新视角",
                  "link": "/peterattiamd/lactate_metabolism_practical_guide"
                },
                {
                  "text": "自噬激活健康指南",
                  "link": "/peterattiamd/autophagy_health_guide"
                },
                {
                  "text": "mTOR通路调节指南",
                  "link": "/peterattiamd/cell_metabolism_and_aging"
                }
              ]
            },
            {
              "text": "E. 器官系统代谢健康",
              "items": [
                {
                  "text": "肝脏健康保护策略",
                  "link": "/peterattiamd/liver_health_action_guide"
                },
                {
                  "text": "肠道微生物组健康指南",
                  "link": "/peterattiamd/gut_microbiome_health_guide"
                },
                {
                  "text": "肠道微生物组与大脑双向通讯指南",
                  "link": "/peterattiamd/gut_brain_communication_guide"
                }
              ]
            },
            {
              "text": "F. 炎症和氧化应激",
              "items": [
                {
                  "text": "炎症健康指南",
                  "link": "/peterattiamd/health_longevity_practical_guide_2"
                }
              ]
            },
            {
              "text": "G. 碳水与糖代谢",
              "items": [
                {
                  "text": "果糖代谢机制与代谢健康优化策略",
                  "link": "/peterattiamd/fructose_metabolism_health_improvement"
                },
                {
                  "text": "果糖代谢危害与干预指南",
                  "link": "/peterattiamd/fructose_metabolism_and_syndrome"
                },
                {
                  "text": "果糖代谢机制及其促进脂肪肝风险",
                  "link": "/peterattiamd/fructose_metabolism_health_guide"
                }
              ]
            },
            {
              "text": "H. 体重与脂肪代谢",
              "items": [
                {
                  "text": "减重后代谢适应机制与实用对策",
                  "link": "/peterattiamd/weight_management_practical_guide"
                },
                {
                  "text": "低碳高脂饮食重新定义肥胖管理",
                  "link": "/peterattiamd/understanding_obesity_nutrition_guide"
                },
                {
                  "text": "低碳水高蛋白饮食配合连续血糖监测",
                  "link": "/peterattiamd/type1_diabetes_management_strategies"
                },
                {
                  "text": "胰岛素主导脂肪代谢控制",
                  "link": "/peterattiamd/fat_flow_science_action_guide"
                },
                {
                  "text": "神经科学视角下体重调控原理与实践",
                  "link": "/peterattiamd/brain_weight_control_guide"
                }
              ]
            },
            {
              "text": "I. 代谢相关特殊应用",
              "items": [
                {
                  "text": "多巴胺平衡理论指导下的成瘾管理实用策略",
                  "link": "/peterattiamd/understanding_addiction_management"
                }
              ]
            }
          ]
        },
        {
          "text": "第2章：肌肉骨骼系统",
          "collapsed": true,
          "items": [
            {
              "text": "A. 肌肉骨骼系统基础评估",
              "items": [
                {
                  "text": "DEXA扫描指导体成分优化",
                  "link": "/peterattiamd/body_composition_health_guide"
                },
                {
                  "text": "握力训练与力量锻炼作为长寿关键指标",
                  "link": "/peterattiamd/health_fitness_longevity_tips"
                }
              ]
            },
            {
              "text": "B. 肌肉健康核心策略",
              "items": [
                {
                  "text": "肌肉健康最佳实践",
                  "link": "/peterattiamd/protein_workout_nutrition_guide"
                },
                {
                  "text": "循证肌肉代谢健康指南",
                  "link": "/peterattiamd/muscle_metabolism_health_guide"
                },
                {
                  "text": "肌肉优先身体组成管理法",
                  "link": "/peterattiamd/body_composition_management_guide"
                }
              ]
            },
            {
              "text": "C. 肌肉增长与力量发展",
              "items": [
                {
                  "text": "肌肉生长与力量增进实用指南",
                  "link": "/peterattiamd/strength_training_nutrition_guide"
                },
                {
                  "text": "肌肉增长指南",
                  "link": "/peterattiamd/muscle_growth_weight_management_guide"
                },
                {
                  "text": "肌肉增长最大化指南",
                  "link": "/peterattiamd/muscle_growth_strength_training_guide"
                }
              ]
            },
            {
              "text": "D. 姿势与核心稳定性",
              "items": [
                {
                  "text": "膈式呼吸与姿势稳定",
                  "link": "/peterattiamd/dynamic_neuromuscular_stabilization_guide"
                }
              ]
            },
            {
              "text": "E. 骨骼与关节健康",
              "items": [
                {
                  "text": "维骨健康全方案",
                  "link": "/peterattiamd/bone_health_action_guide"
                },
                {
                  "text": "膝关节健康最佳实践",
                  "link": "/peterattiamd/orthopedic_health_guide"
                },
                {
                  "text": "下背痛恢复指南",
                  "link": "/peterattiamd/back_pain_action_guide"
                },
                {
                  "text": "[NEW] 骨骼健康行动指南：预防和改善策略",
                  "link": "/peterattiamd/bone_health_prevention_improvement_strategies"
                }
              ]
            },
            {
              "text": "F. 身体各部位健康优化",
              "items": [
                {
                  "text": "专业上肢保护指南",
                  "link": "/peterattiamd/upper_limb_health_guide"
                },
                {
                  "text": "足部健康全面指南",
                  "link": "/peterattiamd/foot_health_practical_guide"
                },
                {
                  "text": "口腔护理全面指南",
                  "link": "/peterattiamd/oral_health_prevention_guide"
                },
                {
                  "text": "下肢健康实用指南",
                  "link": "/peterattiamd/leg_health_practical_guide"
                }
              ]
            },
            {
              "text": "G. 运动技术与特殊应用",
              "items": [
                {
                  "text": "前脚掌着地跑步与极简鞋逐步过渡指南",
                  "link": "/peterattiamd/running_biomechanics_foot_health_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第3章：心血管系统",
          "collapsed": true,
          "items": [
            {
              "text": "A. 心血管健康基础理解",
              "items": [
                {
                  "text": "循证心脏健康行动指南",
                  "link": "/peterattiamd/heart_health_action_guide"
                },
                {
                  "text": "心血管健康全面优化指南",
                  "link": "/peterattiamd/heart_health_lifestyle_guide"
                }
              ]
            },
            {
              "text": "B. 现代心血管风险评估",
              "items": [
                {
                  "text": "心血管健康新标准",
                  "link": "/peterattiamd/cardiovascular_health_guide"
                },
                {
                  "text": "粒子数量胜于胆固醇含量",
                  "link": "/peterattiamd/cholesterol_risk_assessment"
                },
                {
                  "text": "心血管预防医学转向apoB检测",
                  "link": "/peterattiamd/heart_disease_risk_prevention"
                },
                {
                  "text": "脂质代谢动态系统观",
                  "link": "/peterattiamd/lipid_science_practical_guide"
                },
                {
                  "text": "HDL功能重要性超越数值",
                  "link": "/peterattiamd/hdl_clinical_guidelines"
                }
              ]
            },
            {
              "text": "C. 预防与风险管理核心策略",
              "items": [
                {
                  "text": "心血管疾病预防核心策略",
                  "link": "/peterattiamd/cardiovascular_disease_prevention_guide"
                },
                {
                  "text": "心血管疾病预防指南",
                  "link": "/peterattiamd/ascvd_practical_guide"
                },
                {
                  "text": "心血管疾病预防ApoB指标优于传统LDL胆固醇",
                  "link": "/peterattiamd/cardiovascular_disease_prevention_guide_2"
                },
                {
                  "text": "心血管健康综合防治策略",
                  "link": "/peterattiamd/heart_health_prevention_guide"
                },
                {
                  "text": "心血管疾病防治指南",
                  "link": "/peterattiamd/cardiovascular_protection_lipid_guidelines"
                },
                {
                  "text": "心血管预防",
                  "link": "/peterattiamd/lipid_management_for_cvd_prevention"
                },
                {
                  "text": "心血管健康脂质管理指南",
                  "link": "/peterattiamd/lipid_cardiovascular_health_guide"
                }
              ]
            },
            {
              "text": "D. 具体干预与管理策略",
              "items": [
                {
                  "text": "低碳高脂饮食胆固醇管理指南",
                  "link": "/peterattiamd/low_carb_cholesterol_guide"
                },
                {
                  "text": "脂质健康指南",
                  "link": "/peterattiamd/lipids_and_health_guide"
                },
                {
                  "text": "降压睡眠训练多维指南",
                  "link": "/peterattiamd/sleep_health_podcast_guide"
                }
              ]
            },
            {
              "text": "E. 特殊风险因素与人群考量",
              "items": [
                {
                  "text": "女性特异性心血管风险管理策略",
                  "link": "/peterattiamd/womens_heart_health_guide"
                },
                {
                  "text": "心血管疾病真因与预防管理",
                  "link": "/peterattiamd/cardiovascular_health_hormone_guide"
                },
                {
                  "text": "脂蛋白a测量指南",
                  "link": "/peterattiamd/lp_cardiovascular_risk_management"
                },
                {
                  "text": "男性性健康行动指南",
                  "link": "/peterattiamd/mens_sexual_health_guide"
                }
              ]
            },
            {
              "text": "F. 紧急状况识别与处理",
              "items": [
                {
                  "text": "腹部动脉瘤症状识别与紧急处理指南",
                  "link": "/peterattiamd/abdominal_aneurysm_risk_prevention"
                }
              ]
            }
          ]
        },
        {
          "text": "第4章：神经内分泌系统",
          "collapsed": true,
          "items": [
            {
              "text": "A. 神经内分泌系统基础与评估",
              "items": [
                {
                  "text": "精神疾病神经生物学基础",
                  "link": "/peterattiamd/neuroscience_of_mental_health"
                },
                {
                  "text": "内分泌系统全面评估指南",
                  "link": "/peterattiamd/endocrine_hormone_guide"
                },
                {
                  "text": "[NEW] 女性生育健康与不孕症：实用行动指南",
                  "link": "/peterattiamd/womens_fertility_action_guide"
                },
                {
                  "text": "[NEW] 男性生育力优化指南：从精子生成到生活方式干预",
                  "link": "/peterattiamd/male_fertility_optimization_guide"
                },
                {
                  "text": "[NEW] 绝经期与激素替代疗法(HRT)实用指南",
                  "link": "/peterattiamd/menopausal_hormone_replacement_therapy"
                }
              ]
            },
            {
              "text": "B. 大脑与认知健康优化",
              "items": [
                {
                  "text": "Klotho蛋白增强认知指南",
                  "link": "/peterattiamd/klotho_brain_health_guide"
                },
                {
                  "text": "优化认知健康指南",
                  "link": "/peterattiamd/brain_health_optimization_guide"
                },
                {
                  "text": "脑震荡管理指南",
                  "link": "/peterattiamd/concussion_recovery_guide"
                }
              ]
            },
            {
              "text": "C. 情绪与压力管理",
              "items": [
                {
                  "text": "不确定时期保持稳定的结构化指南",
                  "link": "/peterattiamd/staying_calm_uncertain_times"
                },
                {
                  "text": "从F1车手传奇看心理韧性平衡",
                  "link": "/peterattiamd/mental_resilience_from_f1_drivers"
                }
              ]
            },
            {
              "text": "D. 特定人群内分泌健康",
              "items": [
                {
                  "text": "更年期女性性健康管理指南",
                  "link": "/peterattiamd/womens_sexual_health_guide"
                },
                {
                  "text": "神经发展差异儿童支持指南",
                  "link": "/peterattiamd/autism_adhd_anxiety_support_guide"
                },
                {
                  "text": "[NEW] 医学播客实用指南：生育、荷尔蒙、抗衰老和生活质量",
                  "link": "/peterattiamd/medical_podcast_practical_guide"
                }
              ]
            },
            {
              "text": "E. 特殊治疗方法",
              "items": [
                {
                  "text": "MDMA辅助心理治疗用于PTSD患者的临床途径",
                  "link": "/peterattiamd/mdma_therapy_for_ptsd"
                }
              ]
            }
          ]
        },
        {
          "text": "第5章：营养干预",
          "collapsed": true,
          "items": [
            {
              "text": "A. 基础饮食原则",
              "items": [
                {
                  "text": "全食蔬果替代加工食品指南",
                  "link": "/peterattiamd/fruits_veggies_nutrition_guide"
                },
                {
                  "text": "全食物饮食修复肠道微生物组指南",
                  "link": "/peterattiamd/sustainable_healthy_eating_guide"
                },
                {
                  "text": "热量摄入控制体重80%效能",
                  "link": "/peterattiamd/energy_balance_longevity_guide"
                }
              ]
            },
            {
              "text": "B. 宏量营养素优化与蛋白质策略",
              "items": [
                {
                  "text": "蛋白质战略1.6克每公斤",
                  "link": "/peterattiamd/muscle_protein_nutrition_guide"
                },
                {
                  "text": "轴鹿肉作为极低脂高蛋白红肉选择",
                  "link": "/peterattiamd/deer_meat_nutrition_guide"
                },
                {
                  "text": "尿酸管理与蛋白质优化策略",
                  "link": "/peterattiamd/control_uric_acid_protein_intake"
                }
              ]
            },
            {
              "text": "C. 时间限制进食与禁食",
              "items": [
                {
                  "text": "科学断食指南",
                  "link": "/peterattiamd/fasting_nutrition_time_management"
                },
                {
                  "text": "禁食降低胰岛素水平指南",
                  "link": "/peterattiamd/fasting_guide_for_metabolic_health"
                },
                {
                  "text": "禁食实践全流程",
                  "link": "/peterattiamd/fasting_practice_guide"
                },
                {
                  "text": "禁食锻炼实用指南",
                  "link": "/peterattiamd/fasting_exercise_practical_guide"
                },
                {
                  "text": "[NEW] 禁食实用指南：健康益处、风险及实施框架",
                  "link": "/peterattiamd/fasting_guide_benefits_risks"
                }
              ]
            },
            {
              "text": "D. 生酮饮食与低碳水策略",
              "items": [
                {
                  "text": "低碳水酮饮食治疗应用指南",
                  "link": "/peterattiamd/keto_health_action_guide"
                },
                {
                  "text": "生酮饮食实践指南",
                  "link": "/peterattiamd/keto_fitness_practical_guide"
                },
                {
                  "text": "生酮饮食癫痫治疗实操指南",
                  "link": "/peterattiamd/keto_metabolism_health_guide"
                },
                {
                  "text": "三天水禁食指南",
                  "link": "/peterattiamd/fasting_guide_key_mechanisms"
                }
              ]
            },
            {
              "text": "E. 微量营养素与特殊补充",
              "items": [
                {
                  "text": "铁代谢全面管理指南",
                  "link": "/peterattiamd/iron_deficiency_supplementation_guide"
                },
                {
                  "text": "镁补充实用全指南",
                  "link": "/peterattiamd/magnesium_supplementation_practical_guide"
                },
                {
                  "text": "糖替代品明智选择指南",
                  "link": "/peterattiamd/sugar_substitutes_selection_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第6章：运动与训练",
          "collapsed": true,
          "items": [
            {
              "text": "A. 运动基础与整体框架",
              "items": [
                {
                  "text": "运动与寿命最优关系",
                  "link": "/peterattiamd/exercise_longevity_practical_guide"
                },
                {
                  "text": "科学运动指南",
                  "link": "/peterattiamd/exercise_science_practical_guide"
                },
                {
                  "text": "长寿运动实用指南",
                  "link": "/peterattiamd/longevity_exercise_practical_guide"
                },
                {
                  "text": "心肺与肌力同步训练策略",
                  "link": "/peterattiamd/cardio_muscle_longevity_foundation"
                },
                {
                  "text": "科学健身四大支柱平衡法",
                  "link": "/peterattiamd/fitness_guide_four_pillars"
                }
              ]
            },
            {
              "text": "B. 有氧训练系统",
              "items": [
                {
                  "text": "区域2训练提升线粒体功能与代谢健康",
                  "link": "/peterattiamd/mitochondrial_health_training_guide"
                },
                {
                  "text": "Zone2训练优化代谢健康指南",
                  "link": "/peterattiamd/zone2_training_magnesium_guide"
                },
                {
                  "text": "低强度MAF心率训练法",
                  "link": "/peterattiamd/low_intensity_heart_rate_training"
                },
                {
                  "text": "HIIT训练指南",
                  "link": "/peterattiamd/hiit_training_guide"
                },
                {
                  "text": "运动表现提升指南",
                  "link": "/peterattiamd/improve_cardio_athletic_performance"
                },
                {
                  "text": "长寿心肺训练系统",
                  "link": "/peterattiamd/cardio_training_for_longevity"
                },
                {
                  "text": "[NEW] 有氧运动与健康管理实用指南：Peter Attia播客要点",
                  "link": "/peterattiamd/cardio_health_management_guide"
                }
              ]
            },
            {
              "text": "C. 力量训练系统",
              "items": [
                {
                  "text": "力量训练指南",
                  "link": "/peterattiamd/strength_training_health_guide"
                },
                {
                  "text": "力量训练长寿指南",
                  "link": "/peterattiamd/strength_training_for_longevity"
                },
                {
                  "text": "力量训练需聚焦快肌维护",
                  "link": "/peterattiamd/muscle_training_practical_guide"
                },
                {
                  "text": "针对力量训练优化与激素平衡的系统方法",
                  "link": "/peterattiamd/strength_training_testosterone_guide"
                },
                {
                  "text": "血流限制训练实用指南",
                  "link": "/peterattiamd/bfr_training_practical_guide"
                },
                {
                  "text": "[NEW] 增强肌肉力量与质量的实用指南：长寿健康的关键策略",
                  "link": "/peterattiamd/muscle_strength_longevity_guide"
                }
              ]
            },
            {
              "text": "D. 特定人群训练策略",
              "items": [
                {
                  "text": "女性增肌减脂科学指南",
                  "link": "/peterattiamd/female_muscle_fat_loss_guide"
                },
                {
                  "text": "年长者运动指南",
                  "link": "/peterattiamd/fitness_for_seniors"
                },
                {
                  "text": "中等强度有氧结合高强度间歇和力量训练的长寿运动方案",
                  "link": "/peterattiamd/exercise_for_health_and_longevity"
                }
              ]
            },
            {
              "text": "E. 特定训练方法与应用",
              "items": [
                {
                  "text": "负重行走训练体系",
                  "link": "/peterattiamd/weighted_walking_training_guide"
                },
                {
                  "text": "耐力运动训练指南",
                  "link": "/peterattiamd/endurance_training_recovery_guide"
                },
                {
                  "text": "耐力运动表现优化指南",
                  "link": "/peterattiamd/endurance_performance_optimization_guide"
                },
                {
                  "text": "耐力运动中脂肪适应优化睡眠恢复",
                  "link": "/peterattiamd/endurance_training_practical_guide"
                },
                {
                  "text": "马拉松精英训练法",
                  "link": "/peterattiamd/marathon_training_efficiency_guide"
                },
                {
                  "text": "F1赛车极限表现实用策略",
                  "link": "/peterattiamd/high_intensity_training_guide"
                }
              ]
            },
            {
              "text": "F. 训练支持与恢复策略",
              "items": [
                {
                  "text": "运动水分补充策略",
                  "link": "/peterattiamd/hydration_guide_evidence_based"
                },
                {
                  "text": "冷疗循证指南",
                  "link": "/peterattiamd/cold_therapy_implementation_guide"
                },
                {
                  "text": "运动健康与脑保护指南",
                  "link": "/peterattiamd/exercise_health_brain_protection"
                },
                {
                  "text": "[NEW] 伤病预防与康复的实用指南",
                  "link": "/peterattiamd/injury_prevention_recovery_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第7章：补充剂与药物",
          "collapsed": true,
          "items": [
            {
              "text": "A. 补充剂与药物选择基础框架",
              "items": [
                {
                  "text": "补充剂选择决策框架",
                  "link": "/peterattiamd/supplement_evaluation_practical_guide"
                },
                {
                  "text": "补充剂系统评估与个性化应用指南",
                  "link": "/peterattiamd/supplement_selection_guide"
                },
                {
                  "text": "药物安全科学指南",
                  "link": "/peterattiamd/drug_risk_mental_health_guide"
                }
              ]
            },
            {
              "text": "B. 减重与代谢健康药物",
              "items": [
                {
                  "text": "GLP1激动剂与二甲双胍使用指南",
                  "link": "/peterattiamd/glp1_and_metformin_guide"
                },
                {
                  "text": "减肥药GLP1受体激动剂实用指南",
                  "link": "/peterattiamd/glp1_weight_loss_guide_2"
                },
                {
                  "text": "肥胖治疗循证指南",
                  "link": "/peterattiamd/obesity_treatment_evidence_guide"
                },
                {
                  "text": "二甲双胍在健康人群中缺乏延寿证据",
                  "link": "/peterattiamd/metformin_and_placebo_effect"
                },
                {
                  "text": "代谢健康药物选择指南",
                  "link": "/peterattiamd/metabolic_health_treatment_guide"
                }
              ]
            },
            {
              "text": "C. 心血管与常见慢性病药物",
              "items": [
                {
                  "text": "降脂药物个性化指南",
                  "link": "/peterattiamd/cholesterol_medication_practical_guide"
                },
                {
                  "text": "雷尼替丁内在分子不稳定性导致体内产生致癌物NDMA",
                  "link": "/peterattiamd/zantac_cancer_risk_guide"
                }
              ]
            },
            {
              "text": "D. 激素优化与替代疗法",
              "items": [
                {
                  "text": "激素平衡优化指南",
                  "link": "/peterattiamd/hormones_performance_and_health"
                },
                {
                  "text": "睾酮替代疗法实用指南",
                  "link": "/peterattiamd/trt_guide_key_considerations"
                },
                {
                  "text": "睾酮与甲状腺治疗决策指南",
                  "link": "/peterattiamd/muscle_testosterone_thyroid_guide"
                },
                {
                  "text": "更年期HRT实用决策框架",
                  "link": "/peterattiamd/hormone_replacement_therapy_guide_2"
                },
                {
                  "text": "更年期激素疗法指南",
                  "link": "/peterattiamd/menopause_hormone_therapy_guide"
                },
                {
                  "text": "女性更年期HRT实用指南",
                  "link": "/peterattiamd/hormone_replacement_therapy_guide"
                },
                {
                  "text": "[NEW] 脱发应对指南：从科学治疗到有效干预",
                  "link": "/peterattiamd/hair_loss_treatment_guide"
                },
                {
                  "text": "[NEW] 睾酮与前列腺癌关系：实用指南",
                  "link": "/peterattiamd/testosterone_prostate_cancer_guide"
                }
              ]
            },
            {
              "text": "E. 抗衰老与长寿药物",
              "items": [
                {
                  "text": "NAD+衰老表观遗传调控指南",
                  "link": "/peterattiamd/aging_nad_epigenetic_guide"
                },
                {
                  "text": "NAD+水平维持与表观遗传噪声控制",
                  "link": "/peterattiamd/aging_longevity_practical_guide"
                },
                {
                  "text": "基于证据的抗衰老药物实用指南",
                  "link": "/peterattiamd/anti_aging_drug_guide"
                },
                {
                  "text": "间歇性低剂量mTOR抑制",
                  "link": "/peterattiamd/mtor_immune_health_guide"
                }
              ]
            },
            {
              "text": "F. 特定症状的药物与补充剂",
              "items": [
                {
                  "text": "脱发治疗指南",
                  "link": "/peterattiamd/hair_loss_prevention_guide"
                },
                {
                  "text": "生物化学营养调理指南",
                  "link": "/peterattiamd/methyl_nads_choline_guide"
                },
                {
                  "text": "阿片类药物安全指南",
                  "link": "/peterattiamd/opioid_crisis_safety_guide"
                }
              ]
            },
            {
              "text": "G. 特殊治疗与新兴疗法",
              "items": [
                {
                  "text": "红光疗法循证应用指南",
                  "link": "/peterattiamd/red_light_therapy_guide"
                },
                {
                  "text": "氯胺酮治疗指南",
                  "link": "/peterattiamd/ketamine_treatment_practical_guide"
                },
                {
                  "text": "尼古丁作为认知增强剂与减重辅助工具的分离使用指南",
                  "link": "/peterattiamd/nicotine_guide_cognitive_benefits_safety"
                },
                {
                  "text": "[NEW] 尼古丁使用的实用指南：认知、健康与使用策略",
                  "link": "/peterattiamd/nicotine_usage_practical_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第8章：环境与生活方式",
          "collapsed": true,
          "items": [
            {
              "text": "A. 睡眠基础与整体框架",
              "items": [
                {
                  "text": "睡眠优化框架",
                  "link": "/peterattiamd/sleep_optimization_practical_guide"
                },
                {
                  "text": "睡眠健康七大实证要素",
                  "link": "/peterattiamd/sleep_health_practical_guide"
                },
                {
                  "text": "睡眠优化必知",
                  "link": "/peterattiamd/sleep_guide_for_health_performance"
                },
                {
                  "text": "睡眠质量优化五大关键",
                  "link": "/peterattiamd/sleep_optimization_guide"
                }
              ]
            },
            {
              "text": "B. 睡眠环境与实施策略",
              "items": [
                {
                  "text": "睡眠优化全方位指南",
                  "link": "/peterattiamd/sleep_optimization_guide_2"
                },
                {
                  "text": "睡眠优化指南",
                  "link": "/peterattiamd/quality_sleep_practical_guide"
                },
                {
                  "text": "科学化睡眠优化指南",
                  "link": "/peterattiamd/scientific_sleep_optimization_non_pharmacological_therapy_guide"
                },
                {
                  "text": "科学睡眠优化指南",
                  "link": "/peterattiamd/scientific_sleep_optimization_rem_guide"
                },
                {
                  "text": "睡眠优化关键行动",
                  "link": "/peterattiamd/sleep_optimization_practical_guide_2"
                },
                {
                  "text": "[NEW] 改善失眠和睡眠障碍的实用指南：认知行为疗法(CBT-I)",
                  "link": "/peterattiamd/insomnia_treatment_practical_guide"
                }
              ]
            },
            {
              "text": "C. 光照与昼夜节律管理",
              "items": [
                {
                  "text": "科学光照暴露时机管理",
                  "link": "/peterattiamd/light_and_circadian_rhythm_guide"
                },
                {
                  "text": "昼夜光照优化模式",
                  "link": "/peterattiamd/optimal_light_immune_health_guide"
                },
                {
                  "text": "基于神经科学设计的日常优化指南",
                  "link": "/peterattiamd/action_guide_from_neuroscience"
                }
              ]
            },
            {
              "text": "D. 热疗与冷疗策略",
              "items": [
                {
                  "text": "桑拿热疗禁食与运动协同促进长寿",
                  "link": "/peterattiamd/sauna_fasting_exercise_for_longevity"
                },
                {
                  "text": "桑拿冷疗实用指南",
                  "link": "/peterattiamd/heat_cold_therapy_guide"
                }
              ]
            },
            {
              "text": "E. 正念与压力管理",
              "items": [
                {
                  "text": "冥想正念实践指南",
                  "link": "/peterattiamd/mindfulness_meditation_guide"
                },
                {
                  "text": "冥想正念实践指南",
                  "link": "/peterattiamd/mindfulness_meditation_practice_guide"
                },
                {
                  "text": "每日短时正念冥想和限制邮件检查等微习惯管理压力",
                  "link": "/peterattiamd/stress_health_coping_strategies"
                }
              ]
            },
            {
              "text": "F. 环境设计与习惯形成",
              "items": [
                {
                  "text": "环境设计习惯微型化身份认同为核心的四法则习惯形成系统",
                  "link": "/peterattiamd/practical_habit_building_guide"
                },
                {
                  "text": "引入有益不适感锻炼健康指南",
                  "link": "/peterattiamd/physical_mental_health_guide"
                },
                {
                  "text": "稀缺思维应对现代过剩",
                  "link": "/peterattiamd/scarcity_mindset_to_action"
                }
              ]
            },
            {
              "text": "G. 环境因素管理",
              "items": [
                {
                  "text": "微塑料防护策略",
                  "link": "/peterattiamd/reduce_microplastic_exposure_guide"
                },
                {
                  "text": "酒精影响心率变异性与睡眠质量",
                  "link": "/peterattiamd/heart_rate_variability_alcohol_guide"
                },
                {
                  "text": "[NEW] 道路安全行动指南：降低驾驶风险的实用策略",
                  "link": "/peterattiamd/road_safety_driving_guide"
                }
              ]
            },
            {
              "text": "H. 健康生活哲学与整体方法",
              "items": [
                {
                  "text": "个人转变结合慈善创新",
                  "link": "/peterattiamd/personal_transformation_charity_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第9章：健康监测系统",
          "collapsed": true,
          "items": [
            {
              "text": "A. 健康监测基础框架",
              "items": [
                {
                  "text": "医学健康优化指南",
                  "link": "/peterattiamd/health_action_guide"
                },
                {
                  "text": "实验室检测在长寿预防医学中的五项关键检测",
                  "link": "/peterattiamd/lab_testing_longevity_guide"
                },
                {
                  "text": "多层次医疗筛查策略",
                  "link": "/peterattiamd/medical_screening_health_monitoring_guide"
                }
              ]
            },
            {
              "text": "B. 日常可用的自我监测技术",
              "items": [
                {
                  "text": "心率变异性HRV测量指南",
                  "link": "/peterattiamd/heart_rate_variability_guide"
                },
                {
                  "text": "连续血糖监测指南",
                  "link": "/peterattiamd/continuous_glucose_monitoring_guide"
                }
              ]
            },
            {
              "text": "C. 专业健康标志物评估",
              "items": [
                {
                  "text": "心率恢复与肾功能监测指南",
                  "link": "/peterattiamd/exercise_kidney_brain_health"
                }
              ]
            },
            {
              "text": "D. 高级医学成像与筛查技术",
              "items": [
                {
                  "text": "不同医学成像技术选择指南",
                  "link": "/peterattiamd/medical_imaging_best_practices"
                },
                {
                  "text": "液体活检和表观遗传学筛查指南",
                  "link": "/peterattiamd/liquid_biopsy_epigenetic_health_guide"
                },
                {
                  "text": "液体活检技术在癌症复发监测与晚期基因突变分析中表现优异",
                  "link": "/peterattiamd/liquid_biopsy_for_cancer_detection"
                }
              ]
            }
          ]
        },
        {
          "text": "第10章：疾病预防策略",
          "collapsed": true,
          "items": [
            {
              "text": "A. 预防医学基础框架",
              "items": [
                {
                  "text": "现代医学预防指南",
                  "link": "/peterattiamd/medical_practice_guidelines"
                }
              ]
            },
            {
              "text": "B. 癌症预防综合策略",
              "items": [
                {
                  "text": "癌症防治实用指南",
                  "link": "/peterattiamd/cancer_prevention_practical_path"
                },
                {
                  "text": "癌症防治全周期指南",
                  "link": "/peterattiamd/cancer_prevention_treatment_guide"
                },
                {
                  "text": "癌症筛查指南",
                  "link": "/peterattiamd/cancer_screening_practical_guide"
                },
                {
                  "text": "癌症筛查分层策略",
                  "link": "/peterattiamd/cancer_screening_guide"
                },
                {
                  "text": "癌症筛查与治疗指南",
                  "link": "/peterattiamd/cancer_detection_treatment_advances"
                }
              ]
            },
            {
              "text": "C. 特定癌症的预防与管理",
              "items": [
                {
                  "text": "前列腺健康全面管理指南",
                  "link": "/peterattiamd/prostate_health_cancer_management"
                },
                {
                  "text": "前列腺癌分层筛查指南",
                  "link": "/peterattiamd/prostate_cancer_screening_guide"
                },
                {
                  "text": "乳腺癌全程管理指南",
                  "link": "/peterattiamd/breast_cancer_practical_guide"
                },
                {
                  "text": "皮肤癌防护完整指南",
                  "link": "/peterattiamd/skin_cancer_prevention_guide"
                }
              ]
            },
            {
              "text": "D. 癌症代谢与治疗新策略",
              "items": [
                {
                  "text": "Warburg效应癌症代谢理论指南",
                  "link": "/peterattiamd/cancer_prevention_practical_guide"
                },
                {
                  "text": "癌症代谢疗法指南",
                  "link": "/peterattiamd/cancer_metabolism_action_guide"
                },
                {
                  "text": "癌症代谢调控指南",
                  "link": "/peterattiamd/diabetes_insulin_cancer_guide"
                },
                {
                  "text": "癌症免疫疗法指南",
                  "link": "/peterattiamd/cancer_immunotherapy_guide"
                },
                {
                  "text": "癌症治疗新视角",
                  "link": "/peterattiamd/cancer_research_treatment_insights"
                },
                {
                  "text": "癌症适应性治疗",
                  "link": "/peterattiamd/cancer_treatment_practical_guide"
                },
                {
                  "text": "癌症早期警示",
                  "link": "/peterattiamd/health_recovery_practical_guide"
                },
                {
                  "text": "[NEW] 癌症治疗与公共卫生领导力：实用行动指南",
                  "link": "/peterattiamd/cancer_treatment_leadership_guide"
                },
                {
                  "text": "[NEW] 放射治疗与低剂量辐射应用：实用指南",
                  "link": "/peterattiamd/radiation_therapy_practical_guide"
                }
              ]
            },
            {
              "text": "E. 神经退行性疾病预防",
              "items": [
                {
                  "text": "神经退行性疾病多元预防指南",
                  "link": "/peterattiamd/alzheimers_prevention_movement_guide"
                },
                {
                  "text": "阿尔茨海默病全面预防指南",
                  "link": "/peterattiamd/alzheimer_prevention_guide"
                },
                {
                  "text": "阿尔茨海默病预防实践指南",
                  "link": "/peterattiamd/alzheimer_research_intervention"
                },
                {
                  "text": "阿尔茨海默病预防策略",
                  "link": "/peterattiamd/preventing_alzheimers_guide"
                },
                {
                  "text": "阿尔茨海默痴呆前沿研究",
                  "link": "/peterattiamd/alzheimers_dementia_research_advice"
                },
                {
                  "text": "基于阿尔茨海默病预防的强循证策略",
                  "link": "/peterattiamd/alzheimers_prevention_guide"
                },
                {
                  "text": "[NEW] 大脑健康与身体优化的实用指南",
                  "link": "/peterattiamd/brain_health_body_optimization_guide"
                }
              ]
            },
            {
              "text": "F. 传染病预防与疫情应对",
              "items": [
                {
                  "text": "西班牙流感历史经验指导大流行应对三大策略",
                  "link": "/peterattiamd/pandemic_response_lessons"
                },
                {
                  "text": "COVID19防护实用策略",
                  "link": "/peterattiamd/covid19_action_strategies"
                },
                {
                  "text": "新冠病毒防护指南",
                  "link": "/peterattiamd/covid_protection_long_term_response_strategies_guide"
                },
                {
                  "text": "新冠防护实用指南",
                  "link": "/peterattiamd/covid_protection_long_term_impact_forecast_guide"
                },
                {
                  "text": "新冠传播主要通过近距离接触",
                  "link": "/peterattiamd/covid_prevention_guide"
                },
                {
                  "text": "新冠疫情精准防护指南",
                  "link": "/peterattiamd/covid19_prevention_grading_strategy_guide"
                },
                {
                  "text": "新冠疫苗完整指南",
                  "link": "/peterattiamd/covid_vaccine_immunity_guide"
                },
                {
                  "text": "新冠疫苗接种指南",
                  "link": "/peterattiamd/covid_vaccine_guide"
                },
                {
                  "text": "单克隆抗体与疫苗协同策略",
                  "link": "/peterattiamd/monoclonal_antibodies_covid_defense_guide"
                },
                {
                  "text": "疫情溯源争议应对指南",
                  "link": "/peterattiamd/covid_origin_response_guide"
                }
              ]
            },
            {
              "text": "G. 特定健康状况预防",
              "items": [
                {
                  "text": "膝关节炎和黄斑变性患者的衰老细胞清除疗法",
                  "link": "/peterattiamd/aging_cell_removal_guide"
                },
                {
                  "text": "儿童户外活动减半近视风险与眼部健康护理全指南",
                  "link": "/peterattiamd/eye_health_protection_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第11章：医疗系统导航",
          "collapsed": true,
          "items": [
            {
              "text": "A. 医学信息评估与研究解读",
              "items": [
                {
                  "text": "医学信息可靠性评估框架",
                  "link": "/peterattiamd/reliable_medical_information_guide"
                },
                {
                  "text": "医学研究可靠性评估框架",
                  "link": "/peterattiamd/medical_research_reliability_assessment"
                },
                {
                  "text": "医学研究批判性解读框架",
                  "link": "/peterattiamd/research_to_action_guide"
                },
                {
                  "text": "医学研究评估系统化方法",
                  "link": "/peterattiamd/evaluating_medical_research_guide"
                }
              ]
            },
            {
              "text": "B. 医疗系统与医患互动",
              "items": [
                {
                  "text": "医院患者安全行动指南",
                  "link": "/peterattiamd/patient_safety_in_healthcare"
                },
                {
                  "text": "美国医疗系统个人优化策略",
                  "link": "/peterattiamd/us_healthcare_guide"
                },
                {
                  "text": "美国医疗系统自我保护策略",
                  "link": "/peterattiamd/healthcare_cost_saving_guide"
                },
                {
                  "text": "医学错误分类框架",
                  "link": "/peterattiamd/medical_error_framework_in_enforcement"
                }
              ]
            },
            {
              "text": "C. 药品安全与特殊物质管理",
              "items": [
                {
                  "text": "医用大麻临床应用指南",
                  "link": "/peterattiamd/medical_cannabis_practical_guide"
                },
                {
                  "text": "通用药品质量保障指南",
                  "link": "/peterattiamd/safety_guide_for_generic_medicines"
                },
                {
                  "text": "疫苗安全性与自闭症无关联",
                  "link": "/peterattiamd/vaccines_autism_practical_guide"
                },
                {
                  "text": "芬太尼危机防护指南",
                  "link": "/peterattiamd/fentanyl_crisis_parent_guide"
                }
              ]
            },
            {
              "text": "D. 特定治疗决策与终末期照护",
              "items": [
                {
                  "text": "癌症治疗决策平衡论",
                  "link": "/peterattiamd/cancer_treatment_decision_balance_guide"
                },
                {
                  "text": "医学实践更新指南",
                  "link": "/peterattiamd/medical_practice_transformation_guide"
                },
                {
                  "text": "整形手术安全决策框架",
                  "link": "/peterattiamd/plastic_surgery_safety_guide"
                },
                {
                  "text": "器官移植实践指南",
                  "link": "/peterattiamd/organ_transplant_practical_guide"
                },
                {
                  "text": "医疗预先指示终末期团队协作",
                  "link": "/peterattiamd/medical_policy_practical_guide"
                },
                {
                  "text": "终末期照护指南",
                  "link": "/peterattiamd/end_of_life_care"
                }
              ]
            },
            {
              "text": "E. 前沿医疗技术",
              "items": [
                {
                  "text": "医疗AI人机协作模式",
                  "link": "/peterattiamd/ai_in_healthcare_guide"
                },
                {
                  "text": "CRISPR基因编辑现状分析",
                  "link": "/peterattiamd/crispr_gene_editing_technology"
                },
                {
                  "text": "基因与细胞疗法实用指南",
                  "link": "/peterattiamd/cell_gene_therapy_practice_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第12章：个性化风险评估",
          "collapsed": true,
          "items": [
            {
              "text": "A. 风险评估基础框架",
              "items": [
                {
                  "text": "遗传医学决策指南",
                  "link": "/peterattiamd/genetic_medicine_practical_guide"
                }
              ]
            },
            {
              "text": "B. 基因测试决策与实施",
              "items": [
                {
                  "text": "基因测试决策指南",
                  "link": "/peterattiamd/genetic_testing_practical_guide"
                }
              ]
            },
            {
              "text": "C. 特定高风险状况管理",
              "items": [
                {
                  "text": "家族性高胆固醇血症早期诊断治疗指南",
                  "link": "/peterattiamd/familial_hypercholesterolemia_control_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第13章：延长健康寿命",
          "collapsed": true,
          "items": [
            {
              "text": "A. 长寿科学基础框架",
              "items": [
                {
                  "text": "健康长寿五大支柱整合",
                  "link": "/peterattiamd/practical_health_guide"
                },
                {
                  "text": "全生命周期健康维护框架",
                  "link": "/peterattiamd/longevity_action_stability_strength_balance_training_guide"
                },
                {
                  "text": "健康干预优先级框架",
                  "link": "/peterattiamd/health_intervention_practical_guide"
                }
              ]
            },
            {
              "text": "B. 衰老机制与科学研究",
              "items": [
                {
                  "text": "长寿百岁老人研究揭示健康老龄化关键因素",
                  "link": "/peterattiamd/longevity_aging_health_guide"
                },
                {
                  "text": "延缓衰老科学行动指南",
                  "link": "/peterattiamd/anti_aging_science_guide"
                },
                {
                  "text": "干预措施延长寿命指南",
                  "link": "/peterattiamd/longevity_intervention_guide"
                },
                {
                  "text": "[NEW] 健康衰老的实用指南：从Kennedy博士的长寿研究中获取行动建议",
                  "link": "/peterattiamd/healthy_aging_practical_guide"
                },
                {
                  "text": "[NEW] 老年健康行动指南：延长寿命与提升生活质量的实用策略",
                  "link": "/peterattiamd/strategies_for_improving_longevity_withResidents"
                }
              ]
            },
            {
              "text": "C. 综合干预策略",
              "items": [
                {
                  "text": "健康长寿实用指南",
                  "link": "/peterattiamd/health_longevity_practical_guide"
                },
                {
                  "text": "健康长寿实用指南",
                  "link": "/peterattiamd/longevity_guide"
                },
                {
                  "text": "衰老干预策略综合指南",
                  "link": "/peterattiamd/aging_longevity_research_guide"
                }
              ]
            },
            {
              "text": "D. 特定抗衰老技术",
              "items": [
                {
                  "text": "抗衰老研究突破",
                  "link": "/peterattiamd/anti_aging_practical_guide"
                },
                {
                  "text": "抗衰老策略指南",
                  "link": "/peterattiamd/anti_aging_practical_strategies"
                },
                {
                  "text": "科学抗衰老完整指南",
                  "link": "/peterattiamd/staying_young_practical_guide"
                },
                {
                  "text": "[NEW] 皮肤护理与面部抗衰老的实用指南",
                  "link": "/peterattiamd/skin_care_anti_aging_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第14章：心理韧性与社交健康",
          "collapsed": true,
          "items": [
            {
              "text": "A. 心理健康与韧性基础",
              "items": [
                {
                  "text": "心理健康早期干预指南",
                  "link": "/peterattiamd/mental_health_practical_guide"
                },
                {
                  "text": "情绪健康习惯培养与三大内在驱动力平衡",
                  "link": "/peterattiamd/emotional_health_longevity_guide"
                },
                {
                  "text": "自我慈悲科学实践指南",
                  "link": "/peterattiamd/self_compassion_practice_guide"
                },
                {
                  "text": "危机应对心理韧性培养指南",
                  "link": "/peterattiamd/mental_health_crisis_resilience_guide"
                },
                {
                  "text": "精神健康整合指南",
                  "link": "/peterattiamd/mental_health_psychedelic_therapy"
                }
              ]
            },
            {
              "text": "B. 思维框架与认知策略",
              "items": [
                {
                  "text": "斯多葛哲学静心实践指南",
                  "link": "/peterattiamd/calm_stoic_practice_guide"
                },
                {
                  "text": "认知失调防护指南",
                  "link": "/peterattiamd/cognitive_dissonance_action_guide"
                },
                {
                  "text": "辩证行为疗法DBT实用技能指南",
                  "link": "/peterattiamd/dbt_emotional_management_guide"
                },
                {
                  "text": "多样化经验形成认知弹性指南",
                  "link": "/peterattiamd/diverse_experience_performance_guide"
                },
                {
                  "text": "射箭精神应用于日常生活",
                  "link": "/peterattiamd/archery_to_excellence_guide"
                }
              ]
            },
            {
              "text": "C. 创伤恢复与心理治愈",
              "items": [
                {
                  "text": "创伤心理治疗指南",
                  "link": "/peterattiamd/trauma_and_mental_health_guide"
                },
                {
                  "text": "创伤疗愈实用指南",
                  "link": "/peterattiamd/healing_trauma_practical_no_protective_reaction_guide"
                },
                {
                  "text": "创伤康复指南",
                  "link": "/peterattiamd/trauma_to_growth_guide"
                },
                {
                  "text": "创伤治愈五步进阶指南",
                  "link": "/peterattiamd/healing_trauma_guide"
                },
                {
                  "text": "创伤疗愈实用指南",
                  "link": "/peterattiamd/healing_trauma_practical_establish_a_support_system_guide"
                },
                {
                  "text": "悲伤康复实用指南",
                  "link": "/peterattiamd/grief_and_recovery_guide"
                },
                {
                  "text": "创伤恢复五步法",
                  "link": "/peterattiamd/trauma_recovery_military_guide"
                },
                {
                  "text": "[NEW] 疼痛管理：从科学到实践的行动指南",
                  "link": "/peterattiamd/pain_management_action_guide"
                }
              ]
            },
            {
              "text": "D. 关系与社交健康",
              "items": [
                {
                  "text": "关系修复实用指南",
                  "link": "/peterattiamd/healing_trauma_through_relationships"
                },
                {
                  "text": "正念疫情应对指南",
                  "link": "/peterattiamd/coping_with_pandemic_stress"
                }
              ]
            },
            {
              "text": "E. 工作与职业心理健康",
              "items": [
                {
                  "text": "精神健康长寿实用指南",
                  "link": "/peterattiamd/mental_health_longevity_guide"
                },
                {
                  "text": "心理倦怠预防策略",
                  "link": "/peterattiamd/mental_burnout_action_guide"
                },
                {
                  "text": "时间压力健康关系及实用减压策略",
                  "link": "/peterattiamd/time_pressure_health_action_guide"
                },
                {
                  "text": "经济学思维实用指南",
                  "link": "/peterattiamd/practical_wisdom_from_economists"
                },
                {
                  "text": "职业体育导师的心理韧性与领导力框架",
                  "link": "/peterattiamd/leadership_resilience_guide_from_sports"
                },
                {
                  "text": "高绩效人士平衡极限表现与自我保护",
                  "link": "/peterattiamd/stress_coping_self_protection"
                },
                {
                  "text": "冠军赛车手希尔经历揭示抑郁信号系统",
                  "link": "/peterattiamd/identity_crisis_depression_mental_health"
                },
                {
                  "text": "高成就者心理健康指南",
                  "link": "/peterattiamd/high_achiever_mental_health_guide"
                }
              ]
            },
            {
              "text": "F. 幸福与生活意义",
              "items": [
                {
                  "text": "幸福科学指南",
                  "link": "/peterattiamd/happiness_practical_guide"
                },
                {
                  "text": "最大化人生满足感",
                  "link": "/peterattiamd/max_life_experience_guide"
                },
                {
                  "text": "死亡觉察驱动生活决策",
                  "link": "/peterattiamd/near_death_wisdom_practical_guide"
                },
                {
                  "text": "[NEW] 临终关怀专家的生命智慧：如何活得更好的实用指南",
                  "link": "/peterattiamd/end_of_life_wisdom_guide"
                }
              ]
            }
          ]
        },
        {
          "text": "第15章：系统性健康整合",
          "collapsed": true,
          "items": [
            {
              "text": "A. 健康整合基础框架",
              "items": [
                {
                  "text": "全面健康长寿行动框架",
                  "link": "/peterattiamd/healthy_longevity_guide"
                },
                {
                  "text": "实用健康指南",
                  "link": "/peterattiamd/health_guide_podcast_to_action"
                },
                {
                  "text": "基于最新营养科学共识的健康行动框架",
                  "link": "/peterattiamd/nutrition_and_health_guide"
                },
                {
                  "text": "[NEW] 医学播客精华：睡眠、疼痛、放射治疗与创伤修复的实用指南",
                  "link": "/peterattiamd/sleep_pain_treatment_healing_guide"
                }
              ]
            },
            {
              "text": "B. 跨系统综合策略",
              "items": [
                {
                  "text": "循证健康优化框架",
                  "link": "/peterattiamd/health_performance_optimization_guide"
                },
                {
                  "text": "循证医学指南",
                  "link": "/peterattiamd/medical_insights_for_today"
                },
                {
                  "text": "长期健康优化的实用指南",
                  "link": "/peterattiamd/mindset_health_habits_guide"
                },
                {
                  "text": "概率思维与系统分析在健康决策中的应用指南",
                  "link": "/peterattiamd/practical_health_decision_guide"
                },
                {
                  "text": "科学健康干预三策略",
                  "link": "/peterattiamd/practical_health_strategies"
                }
              ]
            },
            {
              "text": "C. 长寿医学与年龄适应策略",
              "items": [
                {
                  "text": "长寿医学3.0实践指南",
                  "link": "/peterattiamd/longevity_practice_guide"
                },
                {
                  "text": "长寿医学实践指南",
                  "link": "/peterattiamd/health_longevity_practical_strategies"
                },
                {
                  "text": "长寿实用策略",
                  "link": "/peterattiamd/longevity_key_strategies"
                },
                {
                  "text": "长寿行动指南",
                  "link": "/peterattiamd/longevity_action_emotional_health_priority_guide"
                },
                {
                  "text": "年龄适应型运动策略与前瞻思维培养及社交连接构建指南",
                  "link": "/peterattiamd/longevity_wisdom_from_elias"
                },
                {
                  "text": "年龄逆行战略",
                  "link": "/peterattiamd/centenarian_skills_training_guide"
                },
                {
                  "text": "健康长寿实践框架整合Zone2训练硬拉技巧与Omega3策略",
                  "link": "/peterattiamd/health_practice_guide"
                }
              ]
            },
            {
              "text": "D. 专题整合与数据应用",
              "items": [
                {
                  "text": "医学播客综合指南",
                  "link": "/peterattiamd/medical_podcast_action_guide"
                },
                {
                  "text": "医学健康管理指南",
                  "link": "/peterattiamd/medical_experts_key_insights"
                },
                {
                  "text": "肥胖管理最新科学",
                  "link": "/peterattiamd/obesity_nutrition_action_guide"
                },
                {
                  "text": "非洲努巴山区医疗实践揭示",
                  "link": "/peterattiamd/health_practices_from_nuba"
                }
              ]
            }
          ]
        }
      ],
      '/books/': [
        {
          "text": "《超越百岁》实用行动指南",
          "link": "/books/Outlive: The Science and Art of Longevity.md"
        },
        {
          "text": "《良好的能量》代谢健康实用指南",
          "link": "/books/Good Energy: The Surprising Connection Between Metabolism and Limitless Health.md"
        },
        {
          "text": "《绝佳时间》实用行动指南：优化你的生物钟",
          "link": "/books/Life Time: The New Science of the Body Clock, and How It Can Revolutionize Your Sleep and Health.md"
        },
        {
          "text": "《你可以跑得更快》实用行动指南：马拉松训练与优化",
          "link": "/books/Advanced Marathoning- 2nd Edition.md"
        },
        {
          "text": "《战斗细胞》实用行动指南",
          "link": "/books/Immune: A Journey into the Mysterious System That Keeps You Alive.md"
        },
        {
          "text": "《肠子的小心思》实用指南",
          "link": "/books/Darm mit Charme: Alles uber ein unterschatztes Organ.md"
        },
        {
          "text": "《仿制药的真相》实用指南",
          "link": "/books/Bottle of Lies: The Inside Story of the Generic Drug Boom.md"
        },
        {
          "text": "《疗愈的饮食与断食》实用行动指南",
          "link": "/books/Healing Diet, Healing Fast.md"
        },
        {
          "text": "《成瘾的深渊》实用行动指南",
          "link": "/books/Never Enough: The Neuroscience and Experience of Addiction.md"
        },
        {
          "text": "《思维漫游》实用指南",
          "link": "/books/Mindwandering.md"
        }
      ]
    },

    footer: {
      copyright: 'Copyright © 2025 Health Art. All rights reserved'
    }
  }
})
