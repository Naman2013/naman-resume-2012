import { questModuleType } from 'app/modules/quests/data';

const isSeparateCurrentModule = moduleType =>
  moduleType === questModuleType.textoutput ||
  moduleType === questModuleType.guidepanel;

export const getQuestModuleList = (moduleList = []) => {
  const newModuleList = [];
  let prevModuleType = null;

  if (moduleList.length > 0) {
    moduleList.map(module => {
      if (!prevModuleType && isSeparateCurrentModule(module.moduleType)) {
        newModuleList.push([{}]);
      }

      if (
        isSeparateCurrentModule(module.moduleType) ||
        isSeparateCurrentModule(prevModuleType) ||
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
