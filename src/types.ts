export type TabType = 'apps-script' | 'database' | 'deployment' | 'prompts-tools';

export interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  summary: string;
  prompt: string;
  tags: string[];
  tips?: string[];
}

export interface AnalogyItem {
  id: string;
  term: string;
  koreanTerm: string;
  analogy: string;
  emoji: string;
  description: string;
  whyItMatters: string;
}

export interface UserProjectNote {
  projectName: string;
  repoUrl: string;
  deployedUrl: string;
  databaseType: 'sheets' | 'firebase' | 'local' | 'none';
  selectedAiType: string;
  checklist: {
    promptCreated: boolean;
    codeGenerated: boolean;
    githubPushed: boolean;
    envVarSafe: boolean;
    vercelDeployed: boolean;
    sharedWithFriends: boolean;
  };
  notes: string;
  lastUpdated: string;
}
