import { PASSWORD_HASH } from './gate'

export { PASSWORD_HASH }
export const GATE_KEY = 'site-gate'

// Chạy trước khi trang hiển thị: chưa mở khoá thì ẩn nội dung.
export const gateScript = `try{if(localStorage.getItem('${GATE_KEY}')!=='${PASSWORD_HASH}')document.documentElement.classList.add('locked')}catch(e){document.documentElement.classList.add('locked')}`
