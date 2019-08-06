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
};

const moduleTypes =
  questModuleType.datacollectsame |
  questModuleType.datacollectdifferent |
  questModuleType.imageordering |
  questModuleType.textinput |
  questModuleType.textoutput |
  questModuleType.qamultiplechoice |
  questModuleType.qafreeform |
  questModuleType.qafillblanks;

export type QuestStepModule = {
  moduleId: string,
  moduleIdUser: number,
  moduleIndex: number,
  moduleType: moduleTypes,
};
