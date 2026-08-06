'use client';

import { useWorldStore } from '@/store/useWorldStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene0_Intro } from './Scene0_Intro';
import { Scene1_Problem } from './Scene1_Problem';
import { Scene2_TransactionJourney } from './Scene2_TransactionJourney';
import { Scene3_ArchitectureReveal } from './Scene3_ArchitectureReveal';
import { Scene4_Stage1Ingestion } from './Scene4_Stage1Ingestion';
import { Scene5_Stage2Features } from './Scene5_Stage2Features';
import { Scene6_Stage3Scoring } from './Scene6_Stage3Scoring';
import { Scene7_Stage4Graph } from './Scene7_Stage4Graph';
import { Scene8_Explainability } from './Scene8_Explainability';
import { Scene9_Compliance } from './Scene9_Compliance';
import { Scene10_SARGeneration } from './Scene10_SARGeneration';
import { Scene11_SafetyOverride } from './Scene11_SafetyOverride';
import { Scene12_Finale } from './Scene12_Finale';

export function SceneManager() {
  const activeSceneIndex = useWorldStore((state) => state.activeSceneIndex);

  const renderScene = () => {
    switch (activeSceneIndex) {
      case 0:
        return <Scene0_Intro />;
      case 1:
        return <Scene1_Problem />;
      case 2:
        return <Scene2_TransactionJourney />;
      case 3:
        return <Scene3_ArchitectureReveal />;
      case 4:
        return <Scene4_Stage1Ingestion />;
      case 5:
        return <Scene5_Stage2Features />;
      case 6:
        return <Scene6_Stage3Scoring />;
      case 7:
        return <Scene7_Stage4Graph />;
      case 8:
        return <Scene8_Explainability />;
      case 9:
        return <Scene9_Compliance />;
      case 10:
        return <Scene10_SARGeneration />;
      case 11:
        return <Scene11_SafetyOverride />;
      case 12:
        return <Scene12_Finale />;
      default:
        return <Scene0_Intro />;
    }
  };

  return (
    <div className="relative z-10 w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSceneIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full min-h-screen"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
