// @flow

export const questModuleType = {
  imageordering: 'imageordering',
  textinput: 'textinput',
  textoutput: 'textoutput',
  qamultiplechoice: 'qamultiplechoice',
  qafreeform: 'qafreeform',
};

const moduleTypes =
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
