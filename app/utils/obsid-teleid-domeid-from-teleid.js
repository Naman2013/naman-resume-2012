const obsIdTeleIdDomeIdFromTeleId = (teleId) => {
  const splitTeleId = teleId.split('');
  return {
    teleId,
    domeId: splitTeleId[(splitTeleId.length - 1)],
    obsId: splitTeleId.map((char, index) => (index != splitTeleId.length - 1 ? char : undefined)).join(''),
  };
};

export default obsIdTeleIdDomeIdFromTeleId;
