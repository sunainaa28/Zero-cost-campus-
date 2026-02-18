
import React from 'react';
import { Tool, Category, Platform, StarterPack } from './types';

export const INITIAL_TOOLS: Tool[] = [
  {
    id: '1',
    name: 'GIMP',
    category: Category.DESIGN,
    description: 'The Free & Open Source Image Editor. A powerful alternative to Adobe Photoshop.',
    features: ['Layer management', 'Filter effects', 'Advanced photo manipulation'],
    pricingModel: 'Open Source (Free)',
    officialLink: 'https://www.gimp.org/',
    offlineAvailable: true,
    platforms: [Platform.WINDOWS, Platform.MACOS, Platform.LINUX],
    pros: ['Completely free', 'Highly customizable', 'Rich plugin ecosystem'],
    cons: ['Steep learning curve', 'Interface can be cluttered'],
    rating: 4.5,
    popular: true,
    paidAlternativeTo: 'Adobe Photoshop',
    imageUrl: 'https://picsum.photos/seed/gimp/400/250'
  },
  {
    id: '2',
    name: 'VS Code',
    category: Category.CODING,
    description: 'A lightweight but powerful source code editor which runs on your desktop.',
    features: ['IntelliSense', 'Debugging', 'Built-in Git', 'Extensions'],
    pricingModel: 'Free',
    officialLink: 'https://code.visualstudio.com/',
    offlineAvailable: true,
    platforms: [Platform.WINDOWS, Platform.MACOS, Platform.LINUX],
    pros: ['Massive library of extensions', 'Fast performance', 'Great terminal integration'],
    cons: ['Can consume high memory with many extensions'],
    rating: 4.9,
    popular: true,
    paidAlternativeTo: 'Sublime Text / WebStorm',
    imageUrl: 'https://picsum.photos/seed/vscode/400/250'
  },
  {
    id: '3',
    name: 'LibreOffice',
    category: Category.PRODUCTIVITY,
    description: 'A powerful and free office suite, used by millions of people around the world.',
    features: ['Writer (Word)', 'Calc (Excel)', 'Impress (PowerPoint)', 'Draw'],
    pricingModel: 'Open Source (Free)',
    officialLink: 'https://www.libreoffice.org/',
    offlineAvailable: true,
    platforms: [Platform.WINDOWS, Platform.MACOS, Platform.LINUX],
    pros: ['Compatible with MS Office formats', 'Privacy focused', 'Offline first'],
    cons: ['User interface feels slightly dated', 'Formatting can sometimes break from MS Office'],
    rating: 4.2,
    popular: true,
    paidAlternativeTo: 'Microsoft Office 365',
    imageUrl: 'https://picsum.photos/seed/libreoffice/400/250'
  },
  {
    id: '4',
    name: 'DaVinci Resolve',
    category: Category.MEDIA,
    description: 'Professional video editing, color correction, visual effects and audio post production.',
    features: ['Multi-cam editing', 'Advanced color grading', 'Fairlight audio tools'],
    pricingModel: 'Freemium (Excellent Free Version)',
    officialLink: 'https://www.blackmagicdesign.com/products/davinciresolve',
    offlineAvailable: true,
    platforms: [Platform.WINDOWS, Platform.MACOS, Platform.LINUX],
    pros: ['Industry standard color grading', 'No watermarks on free version', 'All-in-one suite'],
    cons: ['Resource intensive (requires good GPU)', 'Complex workflow'],
    rating: 4.8,
    popular: true,
    paidAlternativeTo: 'Adobe Premiere Pro',
    imageUrl: 'https://picsum.photos/seed/davinci/400/250'
  },
  {
    id: '5',
    name: 'Obsidian',
    category: Category.STUDY,
    description: 'A powerful knowledge base that works on top of a local folder of plain text Markdown files.',
    features: ['Graph view', 'Backlinks', 'Canvas', 'Plugins'],
    pricingModel: 'Free for personal use',
    officialLink: 'https://obsidian.md/',
    offlineAvailable: true,
    platforms: [Platform.WINDOWS, Platform.MACOS, Platform.LINUX, Platform.ANDROID, Platform.IOS],
    pros: ['Data privacy (local files)', 'Highly extensible', 'Fast'],
    cons: ['Steep learning curve for advanced features', 'Syncing requires extra effort/paid plan'],
    rating: 4.7,
    popular: true,
    paidAlternativeTo: 'Roam Research / Notion',
    imageUrl: 'https://picsum.photos/seed/obsidian/400/250'
  },
  {
    id: '6',
    name: 'FreeCAD',
    category: Category.ENGINEERING,
    description: 'A general-purpose parametric 3D computer-aided design (CAD) modeler.',
    features: ['Parametric modeling', 'BIM', 'Robot simulation module'],
    pricingModel: 'Open Source (Free)',
    officialLink: 'https://www.freecad.org/',
    offlineAvailable: true,
    platforms: [Platform.WINDOWS, Platform.MACOS, Platform.LINUX],
    pros: ['Fully open source', 'Powerful geometry kernel', 'Python scripting'],
    cons: ['Clunky UI', 'Less intuitive than commercial CAD'],
    rating: 4.0,
    popular: false,
    paidAlternativeTo: 'AutoCAD / SolidWorks',
    imageUrl: 'https://picsum.photos/seed/freecad/400/250'
  }
];

export const INITIAL_STARTER_PACKS: StarterPack[] = [
  {
    id: 'sp1',
    title: 'CS Freshman Essentials',
    description: 'The perfect toolkit for starting your journey in Computer Science.',
    role: 'Programmers',
    toolIds: ['2', '5', '3'],
    icon: '💻'
  },
  {
    id: 'sp2',
    title: 'Creative Content Creator',
    description: 'Everything you need to produce high-quality videos and graphics.',
    role: 'Content Creators',
    toolIds: ['1', '4', '5'],
    icon: '🎬'
  },
  {
    id: 'sp3',
    title: 'STEM Research Toolkit',
    description: 'Manage your notes, drafts, and technical drawings without spending a dime.',
    role: 'Engineering Students',
    toolIds: ['6', '3', '5'],
    icon: '🏗️'
  }
];
