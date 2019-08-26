// @flow

export const questModuleType = {
  datacollectsame: 'datacollectsame',
  datacollectdifferent: 'datacollectdifferent',
  imageordering: 'imageordering',
  textinput: 'textinput',
  textoutput: 'textoutput',
  qamultiplechoice: 'qamultiplechoice',
  qafreeform: 'qafreeform',
  qafillblanks: 'qafillblanks',
  guidepanel: 'guidepanel',
};

const moduleTypes =
  questModuleType.datacollectsame |
  questModuleType.datacollectdifferent |
  questModuleType.imageordering |
  questModuleType.textinput |
  questModuleType.textoutput |
  questModuleType.qamultiplechoice |
  questModuleType.qafreeform |
  questModuleType.qafillblanksm |
  questModuleType.guidepanel;

export type QuestStepModule = {
  moduleId: string,
  moduleIdUser: number,
  moduleIndex: number,
  moduleType: moduleTypes,
};
