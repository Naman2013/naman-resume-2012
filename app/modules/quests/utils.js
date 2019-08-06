import { questModuleType } from 'app/modules/quests/types';

export const getQuestModuleList = (moduleList = []) => {
  const newModuleList = [];
  let prevModuleType = null;

  if (moduleList.length > 0) {
    moduleList.map(module => {
      if (
        module.moduleType === questModuleType.textoutput ||
        prevModuleType === questModuleType.textoutput ||
        !prevModuleType
      ) {
        newModuleList.push([{ ...module }]);
        prevModuleType = module.moduleType;

        return module;
      }

      newModuleList[newModuleList.length - 1] = [
        ...newModuleList[newModuleList.length - 1],
        { ...module },
      ];

      return module;
    });
  }

  return newModuleList;
};
