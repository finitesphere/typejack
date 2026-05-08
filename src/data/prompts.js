export const SCENE_PROMPTS = {
  phone: {
    easy: [
      "yeah for sure! what time?",
      "on my way, 5 mins!",
      "sounds good to me",
      "haha yeah totally",
      "can you call me later?",
      "ok cool see you soon",
      "let me check and get back to you",
    ],
    hard: [
      "yeah for sure! what time should i head over?",
      "just finished work, running about 10 mins late sorry!",
      "did you see what happened at the cafeteria today? nuts",
      "sorry I'm going to see a movie tonight",
      "I'll be there by 8, see u soon?",
      "My plans just changed I'm going to see a movie, sorry bro",
    ],
  },
  notepad: {
    easy: [
      "TODO: fix the login bug",
      "meeting at 3pm tomorrow",
      "buy milk and eggs",
      "call dentist to reschedule",
      "take trash out",
      "update readme file",
    ],
    hard: [
      "TODO: update personal website by adding new projects",
      "lecture 4: time complexity O(n) vs O(log n) understand this before exam",
      "why does prod work but staging doesnt, investigate nginx config ASAP",
      "assignment 2 due friday: implement binary search tree with deletion",
      "update dot files for linux config",
      "kubernetes pod keeps crashing, fix before tuesday",
    ],
  },
  terminal: {
    easy: [
      "neofetch",
      "sudo pacman -Syu",
      "htop",
      "ls -la",
      "cd ~/.config",
      "man man",
    ],
    hard: [
      "sudo rm -rf /home/user/node_modules",
      "grep -r 'segfault' /var/log/syslog | tail -20",
      "lsmod | grep snd",
      "sudo pacman -Ss Zathura",,
      "~./.config/zathura/zathurac",
      "cat /sys/module/amdgpu/parameters/user_queue",
      "hwclock --systohc"
    ],
  },
  browser: {
    easy: [
      "stackoverflow",
      "news.ycombinator.com",
      "arch linux wiki",
      "chatgpt",
      "github",
    ],
    hard: [
      "react useEffect runs twice in strict mode fix",
      "postgres vs mysql 2026 which is faster",
      "segmentation fault core dumped",
      "how to exit vim stackoverflow",
      "is it safe to run curl | sh stackoverflow",
      "hacker news IT jobs",
      "arch linux vs gentoo for daily driver",
      "is undefined a function",
    ],
  },
  email: {
    easy: [
      "Hi Gabe, thank you for the update.",
      "Appreciate the quick response Gabe.",
      "That makes sense, thanks for clarifying.",
      "Looking forward to the patch notes.",
      "Will there be a public beta for this?",
    ],
    hard: [
      "Hi Gabe, genuinely appreciate the transparency on VAC v2.1 rollout.",
      "Just to confirm, will this affect VAC secured servers retroactively?",
      "The false positive rate on the previous build was honestly unacceptable.",
      "Are kernel level checks still off the table or is that back on the roadmap?",
      "I trust the team but the community needs an official blog post on this.",
      "One more thing, any chance Episode 3 ships before VAC v3?",
    ],
  },
   mmo: {
       easy: [
    'gz on woodcutting 99',
    'does anyone have spare gold',
    'gzz',
    'questing or skilling?',
    'selling feathers',
    ],
      hard: [
    'how many lvls until 99 fletching?',
    'im going to port sarim, need to fish',
    'ranged combat needs a buff',
    'SELLING MITHRIL ARROWS CHEAP',
    'go to varrock I got stuff to sell',
    ],
  },
  vscode: {
    easy: [
      "const x = 10;",
      "console.log('hello world')",
      "import React from 'react'",
      "return <div>Hello</div>",
      "// TODO: fix this",
    ],
    hard: [
      "const [count, setCount] = useState(0);",
      "export default function App() { return <div>Hello</div> }",
      "useEffect(() => { fetchData(); }, [userId]);",
      "const result = arr.filter(x => x.active).map(x => x.name);",
      "throw new Error('Expected a string, got ' + typeof value);",
      "type Props = { name: string; onClick: () => void; };",
      "const debounced = useCallback(debounce(fn, 300), [fn]);",
    ],
  },
}

export const SCENES = [
  {
    id: 'phone',
    label: 'Text message',
    icon: '📱',
    description: 'Reply to Jack',
  },
  {
    id: 'notepad',
    label: 'Notepad',
    icon: '📝',
    description: 'Type your notes',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: '⌨️',
    description: 'Run a command',
  },
  {
    id: 'browser',
    label: 'Browser search',
    icon: '🔍',
    description: 'Search Google',
  },
  {
    id: 'email',
    label: 'Email',
    icon: '✉️',
    description: 'Send a reply',
  },
  {
    id: 'vscode',
    label: 'VS Code',
    icon: '💻',
    description: 'Write some code',
  },
  { id: 'mmo', 
    label: 'GnomeScape', 
    icon: '⚔️', description: 'Type in clan chat' },
]

export function getRandomPrompt(sceneId, difficulty) {
  const pool = SCENE_PROMPTS[sceneId][difficulty]
  return pool[Math.floor(Math.random() * pool.length)]
}
