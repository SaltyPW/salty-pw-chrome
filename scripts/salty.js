function a2BI(buf) {
    var res = BigInt(0);
    var base = BigInt(1);
    for (var i in buf){
	res += BigInt(buf[buf.length - i - 1])*base;
	base = base*BigInt(256);
    }
    return res;
}

const digitsStr='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

function base95(n){
    const b95=BigInt(95);
    if (n == 0)
	return '0';
    var result = ''
    while (n){
        result = digitsStr[n % b95] + result;
        n = n/b95;
    }
    return result;
}

const enc = new TextEncoder();

function makePass(basePassword, salt){
    return new Promise((resolve, reject) => {
	const src = basePassword + salt;
	crypto.subtle.digest('SHA-256', enc.encode(src)).then(
	    dig => resolve(base95(a2BI(new Uint8Array(dig,0, 8))))
	);
    });
};

