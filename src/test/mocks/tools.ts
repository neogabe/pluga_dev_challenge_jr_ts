import { Tool } from '@/types/tools';

export const mockTools: Tool[] = [
  {
    app_id: 'omie',
    name: 'Omie',
    color: '#001E27',
    icon: 'https://assets.pluga.co/apps/icons/omie/omie-icon.svg',
    link: 'https://pluga.co/ferramentas/omie/',
  },
  {
    app_id: 'hotmart',
    name: 'Hotmart',
    color: '#F04E23',
    icon: 'https://assets.pluga.co/apps/icons/hotmart/hotmart-icon.svg',
    link: 'https://pluga.co/ferramentas/hotmart/',
  },
  {
    app_id: 'eduzz',
    name: 'Eduzz',
    color: '#FFCD33',
    icon: 'https://assets.pluga.co/apps/icons/eduzz/eduzz-icon.svg',
    link: 'https://pluga.co/ferramentas/eduzz/',
  },
  {
    app_id: 'jira',
    name: 'Jira Software',
    color: '#0052cc',
    icon: 'https://assets.pluga.co/apps/icons/jira/jira-icon.svg',
    link: 'https://pluga.co/ferramentas/jira/',
  },
  {
    app_id: 'superlogica',
    name: 'Superlógica Assinaturas',
    color: '#43AA96',
    icon: 'https://assets.pluga.co/apps/icons/superlogica/superlogica-icon.svg',
    link: 'https://pluga.co/ferramentas/superlogica/',
  },
  {
    app_id: 'calendly',
    name: 'Calendly',
    color: '#656a74',
    icon: 'https://assets.pluga.co/apps/icons/calendly/calendly-icon.svg',
    link: 'https://pluga.co/ferramentas/calendly/',
  },
  {
    app_id: 'google_docs',
    name: 'Google Docs',
    color: '#005CE2',
    icon: 'https://assets.pluga.co/apps/icons/google_docs/google_docs-icon.svg',
    link: 'https://pluga.co/ferramentas/google_docs/',
  },
  {
    app_id: 'twilio',
    name: 'Twilio',
    color: '#cf272c',
    icon: 'https://assets.pluga.co/apps/icons/twilio/twilio-icon.svg',
    link: 'https://pluga.co/ferramentas/twilio/',
  },
  {
    app_id: 'eventbrite',
    name: 'Eventbrite',
    color: '#FF8300',
    icon: 'https://assets.pluga.co/apps/icons/eventbrite/eventbrite-icon.svg',
    link: 'https://pluga.co/ferramentas/eventbrite/',
  },
  {
    app_id: 'pipefy',
    name: 'Pipefy',
    color: '#3B5BFD',
    icon: 'https://assets.pluga.co/apps/icons/pipefy/pipefy-icon.svg',
    link: 'https://pluga.co/ferramentas/pipefy/',
  },
  {
    app_id: 'active_campaign',
    name: 'ActiveCampaign',
    color: '#356ae6',
    icon: 'https://assets.pluga.co/apps/icons/active_campaign/active_campaign-icon.svg',
    link: 'https://pluga.co/ferramentas/active_campaign/',
  },
  {
    app_id: 'sympla',
    name: 'Sympla',
    color: '#0098ff',
    icon: 'https://assets.pluga.co/apps/icons/sympla/sympla-icon.svg',
    link: 'https://pluga.co/ferramentas/sympla/',
  },
  {
    app_id: 'conta_azul',
    name: 'Conta Azul',
    color: '#2687E9',
    icon: 'https://assets.pluga.co/apps/icons/conta_azul/conta_azul-icon.svg',
    link: 'https://pluga.co/ferramentas/conta_azul/',
  },
  {
    app_id: 'google_sheets',
    name: 'Google Sheets',
    color: '#0C7742',
    icon: 'https://assets.pluga.co/apps/icons/google_sheets/google_sheets-icon.svg',
    link: 'https://pluga.co/ferramentas/google_sheets/',
  },
  {
    app_id: 'rd_station',
    name: 'RD Station Marketing',
    color: '#364a65',
    icon: 'https://assets.pluga.co/apps/icons/rd_station/rd_station-icon.svg',
    link: 'https://pluga.co/ferramentas/rd_station/',
  },
]

export const mockSearchTools = [
  {
    app_id: 'rd_station',
    name: 'RD Station Marketing',
    color: '#364a65',
    icon: 'https://assets.pluga.co/apps/icons/rd_station/rd_station-icon.svg',
    link: 'https://pluga.co/ferramentas/rd_station/',
  },
  {
    app_id: 'google_sheets',
    name: 'Google Sheets',
    color: '#0C7742',
    icon: 'https://assets.pluga.co/apps/icons/google_sheets/google_sheets-icon.svg',
    link: 'https://pluga.co/ferramentas/google_sheets/',
  },
  {
    app_id: 'google_docs',
    name: 'Google Docs',
    color: '#005CE2',
    icon: 'https://assets.pluga.co/apps/icons/google_docs/google_docs-icon.svg',
    link: 'https://pluga.co/ferramentas/google_docs/',
  }
];

export const mockRecentTools: Tool[] = [
  {
    app_id: 'pipefy',
    name: 'Pipefy',
    color: '#3B5BFD',
    icon: 'https://assets.pluga.co/apps/icons/pipefy/pipefy-icon.svg',
    link: 'https://pluga.co/ferramentas/pipefy/',
  },
  {
    app_id: 'twilio',
    name: 'Twilio',
    color: '#cf272c',
    icon: 'https://assets.pluga.co/apps/icons/twilio/twilio-icon.svg',
    link: 'https://pluga.co/ferramentas/twilio/',
  },
  {
    app_id: 'hotmart',
    name: 'Hotmart',
    color: '#F04E23',
    icon: 'https://assets.pluga.co/apps/icons/hotmart/hotmart-icon.svg',
    link: 'https://pluga.co/ferramentas/hotmart/',
  }
];

export const mockModalTool: Tool = {
  app_id: 'omie',
  name: 'Omie',
  color: '#001E27',
  icon: 'https://assets.pluga.co/apps/icons/omie/omie-icon.svg',
  link: 'https://pluga.co/ferramentas/omie/',
};

export const mockFirstPageTools = mockTools.slice(0, 12);

export const mockSecondPageTools = mockTools.slice(12, 15);