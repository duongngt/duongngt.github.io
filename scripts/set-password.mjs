// Đổi mật khẩu vào web: npm run set-password -- "mat-khau-moi"
// Chỉ lưu mã băm SHA-256 vào src/lib/gate.ts, không lưu mật khẩu gốc.
import crypto from 'node:crypto'
import fs from 'node:fs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: npm run set-password -- "your-password"')
  process.exit(1)
}

const hash = crypto.createHash('sha256').update(password).digest('hex')
fs.writeFileSync(
  'src/lib/gate.ts',
  `// Tạo bởi scripts/set-password.mjs — không sửa tay.\nexport const PASSWORD_HASH = '${hash}'\n`,
)
console.log('Password updated. Rebuild to apply.')
