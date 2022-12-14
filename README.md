


## 特性

- 规则化的视觉样式配置，适应各类产品风格。
- 基于 React Native 的多平台支持。
- 使用 TypeScript 开发，提供类型定义文件。

 - **使用 react-native-cli 运行**

```bash
# clone
git clone git@github.com:dongCode/zc-rn.git

# go to ant rn folder
cd zc-rn

# install dependencies
yarn

# start ios
cd rn-kitchen-sink/ios && pod install
yarn ios

# start android
yarn android

# start expo
yarn expo
```

 - **使用 expo-cli 运行**

```bash
# go to expo example folder
cd example

# install dependencies
yarn

# start expo
yarn expo
```

## 安装 & 使用

```bash
npm install zc-rn --save
```

or

```bash
yarn add zc-rn
```

### 安装peer依赖

```bash
npm install @react-native-camera-roll/camera-roll @react-native-picker/picker @react-native-community/segmented-control @react-native-community/slider react-native-gesture-handler
```

or

```bash
yarn add @react-native-camera-roll/camera-roll @react-native-picker/picker @react-native-community/segmented-control @react-native-community/slider react-native-gesture-handler
```

> 安装完依赖后需要到 iOS 目录 `pod install`(auto linking)，Android 不需要手动处理

### 链接字体图标以及自动链接

```bash
# 手动链接字体图标
npx react-native link
```


