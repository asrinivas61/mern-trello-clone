
const libResMapper = (parentLib) => {
  if (parentLib && parentLib.length > 0) {
    parentLib.map(lib => {
      if (lib && lib.library && lib.library.length > 0) {
        return lib.library.map(({ isDirectory, name, parent, directoryKey }) => {
          return {
            id: directoryKey,
            isDirectory,
            name,
            parent
          };
        });
        // return lib.library;
      }
    });
    return parentLib;
  }
};

module.exports = libResMapper;
