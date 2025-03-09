#!/bin/bash

# 確保輸入的分支名稱正確
while true; do
    if [ -z "$1" ]; then
        read -p "請輸入新的 branch 名稱: " BRANCH_NAME
    else
        BRANCH_NAME=$1
    fi

    # 顯示輸入的分支名稱並要求確認
    read -p "你輸入的分支名稱是 '$BRANCH_NAME'，確定嗎？(y/N): " CONFIRM
    if [[ "$CONFIRM" == "y" || "$CONFIRM" == "Y" ]]; then
        break
    fi

    echo "請重新輸入分支名稱..."
    unset BRANCH_NAME  # 清除變數
    unset 1  # 清除命令列參數
done

# 檢查是否在 Git 專案內
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "錯誤：這裡不是 Git 專案目錄！請切換到 Git 專案後再執行。"
    exit 1
fi

# 檢查 branch 是否已存在
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    echo "🔄 分支 '$BRANCH_NAME' 已存在，切換到該分支..."
    git checkout "$BRANCH_NAME"
else
    echo "🚀 建立並切換到新分支：$BRANCH_NAME"
    git checkout -b "$BRANCH_NAME"
fi

# 暫存所有變更
echo "📌 新增所有變更..."
git add .

# 提交變更
read -p "📝 請輸入 commit 訊息: " COMMIT_MSG
git commit -m "$COMMIT_MSG"

# 推送到遠端（如果是新分支，則設定 upstream）
if git ls-remote --heads origin "$BRANCH_NAME" | grep -q "$BRANCH_NAME"; then
    echo "☁️ 分支已存在，直接推送變更..."
    git push
else
    echo "☁️ 推送新分支到 GitHub..."
    git push -u origin "$BRANCH_NAME"
fi

echo "✅ 專案已更新並推送到 GitHub 的分支：$BRANCH_NAME"