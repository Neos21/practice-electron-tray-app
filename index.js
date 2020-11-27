const electron = require('electron');

let tray = null;  // GC でトレイアイコンが消えないようにする : https://qiita.com/hibara/items/4a3c26817e5449ebf722

electron.app.on('ready', () => {
  if(process.platform === 'darwin') electron.app.dock.hide();  // Dock は非表示にする
  // Windows タスクトレイでは ICO 形式を使う必要がある
  // ファイル名が `icon` だとビルド時にアプリアイコン用のアセットと勘違いされるので異なる名前を付けておく
  // ビルド後にパスが狂わないよう `__dirname` を使う
  tray = new electron.Tray(`${__dirname}/icon-16.${process.platform === 'win32' ? 'ico' : 'png'}`);
  tray.setContextMenu(electron.Menu.buildFromTemplate([
    {
      label: 'Hello World',
      click: () => {
        electron.dialog.showMessageBoxSync({
          title: 'Neo\'s Electron Tray App',
          message: 'Hello World',
          detail: `This Is Neo's Electron Tray App. [${process.platform}]`
        });
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      role: 'quit'
    }
  ]));
});
