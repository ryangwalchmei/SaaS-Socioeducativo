import nextJest from "next/jest";
const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"], //@ts-ignore
  testTimeout: 60000,
};

export default createJestConfig(jestConfig);
