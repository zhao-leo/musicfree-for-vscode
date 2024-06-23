const vscode = require('vscode');
const FileExplorer = require('./sidabar/fileExplorer');
function activate() {
    vscode.commands.registerCommand('musicfree.openfile', async () => {
        const folderUri = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            canSelectMany: false,
            openLabel: '选择文件夹'
        });
				if (folderUri && folderUri[0]) {
						const workspaceFolder = folderUri[0].path.substr(1);
						const fileExplorer = new FileExplorer(workspaceFolder);
						vscode.window.registerTreeDataProvider('local', fileExplorer);
				}
    }); // 注册打开本地文件夹的命令
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}