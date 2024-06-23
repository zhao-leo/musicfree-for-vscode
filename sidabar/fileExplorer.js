const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');

class FileExplorer {

    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    async getTreeItem(element) {
        const stat = await fs.stat(element);
        return {
            label: path.basename(element),
            collapsibleState: stat.isDirectory() ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
        };
    }

    async getChildren(element) {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No folder or workspace opened');
            return [];
        }

        const directoryPath = element || this.workspaceRoot;
        let entries = await fs.readdir(directoryPath, { withFileTypes: true });
        let children = [];

        for (let entry of entries) {
            const fullPath = path.join(directoryPath, entry.name);
            if (entry.isDirectory()) {
                children.push(fullPath);
                children = children.concat(await this.getChildren(fullPath));
            } else {
                children.push(fullPath);
            }
        }

        return children;
    }
}

module.exports = FileExplorer;