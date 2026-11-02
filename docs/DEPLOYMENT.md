# 自托管部署

需要 Docker Compose、一个指向服务器的域名，以及开放的 80/443 端口。

```bash
node deploy/configure.mjs your-domain.example you@example.com
docker compose up -d --build
docker compose ps
```

配置脚本会生成 `.env` 和随机 DATA_KEY，不覆盖已存在的配置。示例变量见 [环境模板](../.env.example)。Caddy 自动管理 HTTPS 证书。

更新时保留原 DATA_KEY 和数据卷：更换密钥会导致已有记录无法解密。密钥应与数据库备份分开保管，且不得上传 GitHub。

可选 AI 配置使用 `AI_BASE_URL`、`AI_API_KEY`、`AI_MODEL` 和 `AI_PROVIDER_NAME`；地址需 HTTPS。模型费用由你选择的提供商收取。未配置时保持规则模式。

备份服务每天运行，保留最近 7 天，默认仍在同一服务器。请自行配置异地备份并演练恢复。不要执行会删除数据卷的清理命令。

验证：检查 `/api/health`、注册与登录、记录保存/读取、退出和恢复流程。正式使用前补齐隐私说明与联系方式。
