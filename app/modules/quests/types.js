// @flow

export const questModuleType = {
  datacollectdifferent: 'datacollectdifferent',
  imageordering: 'imageordering',
  textinput: 'textinput',
  textoutput: 'textoutput',
  qamultiplechoice: 'qamultiplechoice',
  qafreeform: 'qafreeform',
};

const moduleTypes =
  questModuleType.datacollectdifferent |
  questModuleType.imageordering |
  questModuleType.textinput |
  questModuleType.textoutput |
  questModuleType.qamultiplechoice |
  questModuleType.qafreeform;

export type QuestStepModule = {
  moduleId: string,
  moduleIdUser: number,
  moduleIndex: number,
  moduleType: moduleTypes,
};
