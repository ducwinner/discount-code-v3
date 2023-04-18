export default function writeLog(message?: any, ...optionalParams: any[]) {
    console.log(`[bss.b2b]`, message, ...optionalParams);
}
