const path = require('path')
const readPkgUp = require('read-pkg-up')
;(async () => {
  try {
    const runtime = require.resolve('sanity/lib/_chunks-es/runtime.js')
    console.log('runtime path =>', runtime)
    const cwd = path.dirname(runtime)
    console.log('cwd =>', cwd)
    const result = await readPkgUp({cwd})
    console.log('read-pkg-up result =>', result)
  } catch (e) {
    console.error('error =>', e && e.stack)
    process.exitCode = 1
  }
})()
