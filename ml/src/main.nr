// Struct representing float numbers using sign, mantissa and exponent.
// When Noir language gets the update to support signed integers, the sign field will be removed
struct Float {
    sign: Field,
    mantissa: Field,
    exponent: Field,
}

// Float number precision of mantissa
global precision : Field = 7;

// ReLU activation function used for neural network ML models
fn relu(x : Float) -> Float {
    let mut res = x;
    if x.sign as u64 == 1 {
        res = Float { sign: 0, mantissa: 0, exponent: 100 };
    }

    res
}

// Truncate Float to "precision" number of digits, 5 in the example
fn truncate(num: Float) -> Float {
    let lookup : [Field; 25] = [
        1,
        10,
        100,
        1000,
        10000,
        100000,
        1000000,
        10000000,
        100000000,
        1000000000,
        10000000000,
        100000000000,
        1000000000000,
        10000000000000,
        100000000000000,
        1000000000000000,
        10000000000000000,
        100000000000000000,
        1000000000000000000,
        10000000000000000000,
        100000000000000000000,
        1000000000000000000000,
        10000000000000000000000,
        100000000000000000000000,
        1000000000000000000000000,
    ];

    let maxValue : Field = 10.pow_32(precision);
    let mut decValue : Field = 1;
    let mut logValue : Field = 0;

    for i in 0..25 {
        if num.mantissa as u64 >= lookup[i] as u64 {
            decValue = lookup[i];
            logValue = i;
        }
    }

    decValue *= 10;
    logValue += 1;

    let mut res : Float = Float { sign: num.sign, mantissa: num.mantissa, exponent: num.exponent };

    if logValue as u64 > precision as u64 {
        let diff = (decValue / maxValue) as u64;
        res = Float { sign: num.sign, mantissa: (num.mantissa as u64 / diff) as Field, exponent: num.exponent + (logValue - precision)};  //
    }

    if res.mantissa == 0 {
        res = Float { sign: res.sign, mantissa: 0, exponent: 100 };
    }

    res
}

// Multiplication of Float numbers
fn mulFloats(x : Float, y : Float) -> Float {
    let mant = x.mantissa * y.mantissa;
    let exp = x.exponent + y.exponent - 100;
    let mut sign : Field = 0;

    if x.sign != y.sign {
        sign = 1;
    }

    truncate(Float { sign: sign, mantissa: mant, exponent: exp })
}

// Dividing of Float numbers
fn divFloats(x : Float, y: Float) -> Float {

    assert(y.mantissa > 0);

    let mut exp1: Field = x.exponent;
    let mut mant1: u64 = x.mantissa as u64;

    let exp2: Field = y.exponent;
    let mant2: Field = y.mantissa;

    // Can't divide lower by higher number with same precision, result will be 0
    // The lower must be multiplied by 10, it means at the same time exponent must be reduced by 1
    if mant1 < mant2 as u64 {
        mant1 *= 10;
        exp1 -= 1;
    }

    let mut new_mant: u64 = 0;
    for i in 0..7 {
        let div = mant1 / mant2 as u64;
        mant1 = (mant1 - mant2 as u64 * div) * 10;

        // For precision N, the highest exponent is 10^(N-1)
        let exp = precision - i - 1;
        let pow = 10.pow_32(exp) as u64;
        new_mant += div * pow;
    }

    let new_exp = 100 + exp1 - exp2 - precision + 1;

    let mut new_sign : Field = 0;

    if x.sign as u64 != y.sign as u64 {
        new_sign = 1;
    }

    Float{sign: new_sign, mantissa: new_mant as Field, exponent: new_exp}
}

// Sumation of Float numbers
fn addFloats(x : Float, y : Float) -> Float {
    let mut mant_1 = x.mantissa;
    let mut mant_2 = y.mantissa;

    let mut exp_1 = x.exponent;
    let mut exp_2 = y.exponent;

    let mut diff : Field = 0;

    if exp_1 as u64 > exp_2 as u64 {
        diff = exp_1 - exp_2;
    } else {
        diff = exp_2 - exp_1;
    }

    let mut pow10 : Field = 10.pow_32(diff);

    if x.exponent as u64 < y.exponent as u64 {
      mant_2 *= pow10;
      exp_1 = x.exponent;
    } else {
      mant_1 *= pow10;
      exp_1 = y.exponent;
    }

    let mut sum_mant = mant_1 + mant_2;
    let mut sign = x.sign;

    if x.sign != y.sign {
        if mant_1 as u64 > mant_2 as u64 {
            sum_mant = mant_1 - mant_2;
        } else {
            sum_mant = mant_2 - mant_1;
            sign = y.sign;
        }
    }

    truncate(Float { sign: sign, mantissa: sum_mant, exponent: exp_1 })
}

// Subtraction of float numbers
fn subFloats(x : Float, y : Float) -> Float {
    addFloats(x, Float { sign: 1 - y.sign, mantissa: y.mantissa, exponent: y.exponent })
}
fn main(
	x_1 : pub [Field; 3],
	x_2 : pub [Field; 3],
	x_3 : pub [Field; 3],
	x_4 : pub [Field; 3],
	y_1 : pub [Field; 3],
	y_2 : pub [Field; 3],
	y_3 : pub [Field; 3]
) {
	let mut X_0_0 = Float{ sign: x_1[0], mantissa: x_1[1], exponent: x_1[2] };
	let mut X_0_1 = Float{ sign: x_2[0], mantissa: x_2[1], exponent: x_2[2] };
	let mut X_0_2 = Float{ sign: x_3[0], mantissa: x_3[1], exponent: x_3[2] };
	let mut X_0_3 = Float{ sign: x_4[0], mantissa: x_4[1], exponent: x_4[2] };
	let A_1_0_0 = mulFloats(X_0_0, Float {sign: 0, mantissa: 882, exponent: 96 });
	let A_1_0_1 = mulFloats(X_0_1, Float {sign: 1, mantissa: 137, exponent: 97 });
	let A_1_0_2 = mulFloats(X_0_2, Float {sign: 0, mantissa: 645, exponent: 97 });
	let A_1_0_3 = mulFloats(X_0_3, Float {sign: 0, mantissa: 146, exponent: 98 });
	let B_0_0_0 = addFloats(A_1_0_0, A_1_0_1);
	let B_0_0_1 = addFloats(B_0_0_0, A_1_0_2);
	let B_0_0_2 = addFloats(B_0_0_1, A_1_0_3);
	let WXb_0_0 = addFloats(B_0_0_2, Float {sign: 1, mantissa: 307, exponent: 97 });
	let X_1_0 = relu(WXb_0_0);
	let A_1_1_0 = mulFloats(X_0_0, Float {sign: 0, mantissa: 354, exponent: 97 });
	let A_1_1_1 = mulFloats(X_0_1, Float {sign: 0, mantissa: 362, exponent: 97 });
	let A_1_1_2 = mulFloats(X_0_2, Float {sign: 1, mantissa: 282, exponent: 96 });
	let A_1_1_3 = mulFloats(X_0_3, Float {sign: 1, mantissa: 500, exponent: 97 });
	let B_0_1_0 = addFloats(A_1_1_0, A_1_1_1);
	let B_0_1_1 = addFloats(B_0_1_0, A_1_1_2);
	let B_0_1_2 = addFloats(B_0_1_1, A_1_1_3);
	let WXb_0_1 = addFloats(B_0_1_2, Float {sign: 0, mantissa: 119, exponent: 97 });
	let X_1_1 = relu(WXb_0_1);
	let A_2_0_0 = mulFloats(X_1_0, Float {sign: 0, mantissa: 457, exponent: 97 });
	let A_2_0_1 = mulFloats(X_1_1, Float {sign: 0, mantissa: 780, exponent: 97 });
	let B_1_0_0 = addFloats(A_2_0_0, A_2_0_1);
	let WXb_1_0 = addFloats(B_1_0_0, Float {sign: 0, mantissa: 510, exponent: 97 });
	let X_2_0 = relu(WXb_1_0);
	let A_2_1_0 = mulFloats(X_1_0, Float {sign: 1, mantissa: 396, exponent: 96 });
	let A_2_1_1 = mulFloats(X_1_1, Float {sign: 0, mantissa: 0, exponent: 100 });
	let B_1_1_0 = addFloats(A_2_1_0, A_2_1_1);
	let WXb_1_1 = addFloats(B_1_1_0, Float {sign: 1, mantissa: 121, exponent: 97 });
	let X_2_1 = relu(WXb_1_1);
	let A_2_2_0 = mulFloats(X_1_0, Float {sign: 0, mantissa: 182, exponent: 98 });
	let A_2_2_1 = mulFloats(X_1_1, Float {sign: 0, mantissa: 564, exponent: 96 });
	let B_1_2_0 = addFloats(A_2_2_0, A_2_2_1);
	let WXb_1_2 = addFloats(B_1_2_0, Float {sign: 1, mantissa: 109, exponent: 98 });
	let X_2_2 = relu(WXb_1_2);
	let A_3_0_0 = mulFloats(X_2_0, Float {sign: 0, mantissa: 102, exponent: 98 });
	let A_3_0_1 = mulFloats(X_2_1, Float {sign: 0, mantissa: 692, exponent: 95 });
	let A_3_0_2 = mulFloats(X_2_2, Float {sign: 1, mantissa: 171, exponent: 98 });
	let B_2_0_0 = addFloats(A_3_0_0, A_3_0_1);
	let B_2_0_1 = addFloats(B_2_0_0, A_3_0_2);
	let WXb_2_0 = addFloats(B_2_0_1, Float {sign: 0, mantissa: 797, exponent: 97 });
	let O_3_0 = relu(WXb_2_0);
	let A_3_1_0 = mulFloats(X_2_0, Float {sign: 1, mantissa: 375, exponent: 97 });
	let A_3_1_1 = mulFloats(X_2_1, Float {sign: 0, mantissa: 185, exponent: 96 });
	let A_3_1_2 = mulFloats(X_2_2, Float {sign: 1, mantissa: 468, exponent: 97 });
	let B_2_1_0 = addFloats(A_3_1_0, A_3_1_1);
	let B_2_1_1 = addFloats(B_2_1_0, A_3_1_2);
	let WXb_2_1 = addFloats(B_2_1_1, Float {sign: 0, mantissa: 929, exponent: 97 });
	let O_3_1 = relu(WXb_2_1);
	let A_3_2_0 = mulFloats(X_2_0, Float {sign: 0, mantissa: 203, exponent: 97 });
	let A_3_2_1 = mulFloats(X_2_1, Float {sign: 0, mantissa: 0, exponent: 100 });
	let A_3_2_2 = mulFloats(X_2_2, Float {sign: 1, mantissa: 468, exponent: 97 });
	let B_2_2_0 = addFloats(A_3_2_0, A_3_2_1);
	let B_2_2_1 = addFloats(B_2_2_0, A_3_2_2);
	let WXb_2_2 = addFloats(B_2_2_1, Float {sign: 1, mantissa: 165, exponent: 98 });
	let O_3_2 = relu(WXb_2_2);

	constrain O_3_0.sign == y_1[0];
	constrain O_3_0.mantissa == y_1[1];
	constrain O_3_0.exponent == y_1[2];
	constrain O_3_1.sign == y_2[0];
	constrain O_3_1.mantissa == y_2[1];
	constrain O_3_1.exponent == y_2[2];
	constrain O_3_2.sign == y_3[0];
	constrain O_3_2.mantissa == y_3[1];
	constrain O_3_2.exponent == y_3[2];
}
// A_1_0_0 = 510e98 * 882e96 = 449e97
// A_1_0_1 = 350e98 * -137e97 = -479e97
// A_1_0_2 = 140e98 * 645e97 = 903e97
// A_1_0_3 = 200e97 * 146e98 = 292e97
// B_0_0_0 = 449e97 + -479e97 = -30e97
// B_0_0_1 = -30e97 + 903e97 = 873e97
// B_0_0_2 = 873e97 + 292e97 = 116e98
// WXb_0_0 = 116e98 + -307e97 = 853e97
// A_1_1_0 = 510e98 * 354e97 = 180e98
// A_1_1_1 = 350e98 * 362e97 = 126e98
// A_1_1_2 = 140e98 * -282e96 = -394e96
// A_1_1_3 = 200e97 * -500e97 = -100e97
// B_0_1_0 = 180e98 + 126e98 = 306e98
// B_0_1_1 = 306e98 + -394e96 = 302e98
// B_0_1_2 = 302e98 + -100e97 = 292e98
// WXb_0_1 = 292e98 + 119e97 = 303e98
// A_2_0_0 = 853e97 * 457e97 = 389e97
// A_2_0_1 = 303e98 * 780e97 = 236e98
// B_1_0_0 = 389e97 + 236e98 = 274e98
// WXb_1_0 = 274e98 + 510e97 = 325e98
// A_2_1_0 = 853e97 * -396e96 = -337e96
// A_2_1_1 = 303e98 * 0e100 = 0e100
// B_1_1_0 = -337e96 + 0e100 = -337e96
// WXb_1_1 = -337e96 + -121e97 = -154e97
// A_2_2_0 = 853e97 * 182e98 = 155e98
// A_2_2_1 = 303e98 * 564e96 = 170e97
// B_1_2_0 = 155e98 + 170e97 = 172e98
// WXb_1_2 = 172e98 + -109e98 = 63e98
// A_3_0_0 = 325e98 * 102e98 = 331e98
// A_3_0_1 = 0e100 * 692e95 = 0e100
// A_3_0_2 = 63e98 * -171e98 = -107e98
// B_2_0_0 = 331e98 + 0e100 = 331e98
// B_2_0_1 = 331e98 + -107e98 = 224e98
// WXb_2_0 = 224e98 + 797e97 = 303e98
// A_3_1_0 = 325e98 * -375e97 = -121e98
// A_3_1_1 = 0e100 * 185e96 = 0e100
// A_3_1_2 = 63e98 * -468e97 = -294e97
// B_2_1_0 = -121e98 + 0e100 = -121e98
// B_2_1_1 = -121e98 + -294e97 = -150e98
// WXb_2_1 = -150e98 + 929e97 = -571e97
// A_3_2_0 = 325e98 * 203e97 = 659e97
// A_3_2_1 = 0e100 * 0e100 = 0e100
// A_3_2_2 = 63e98 * -468e97 = -294e97
// B_2_2_0 = 659e97 + 0e100 = 659e97
// B_2_2_1 = 659e97 + -294e97 = 365e97
// WXb_2_2 = 365e97 + -165e98 = -128e98
// X_0_0 => 510e98
// X_0_1 => 350e98
// X_0_2 => 140e98
// X_0_3 => 200e97
// A_1_0_0 => 449e97
// A_1_0_1 => -479e97
// A_1_0_2 => 903e97
// A_1_0_3 => 292e97
// B_0_0_0 => -30e97
// B_0_0_1 => 873e97
// B_0_0_2 => 116e98
// WXb_0_0 => 853e97
// X_1_0 => 853e97
// A_1_1_0 => 180e98
// A_1_1_1 => 126e98
// A_1_1_2 => -394e96
// A_1_1_3 => -100e97
// B_0_1_0 => 306e98
// B_0_1_1 => 302e98
// B_0_1_2 => 292e98
// WXb_0_1 => 303e98
// X_1_1 => 303e98
// A_2_0_0 => 389e97
// A_2_0_1 => 236e98
// B_1_0_0 => 274e98
// WXb_1_0 => 325e98
// X_2_0 => 325e98
// A_2_1_0 => -337e96
// A_2_1_1 => 0e100
// B_1_1_0 => -337e96
// WXb_1_1 => -154e97
// X_2_1 => 0e100
// A_2_2_0 => 155e98
// A_2_2_1 => 170e97
// B_1_2_0 => 172e98
// WXb_1_2 => 63e98
// X_2_2 => 63e98
// A_3_0_0 => 331e98
// A_3_0_1 => 0e100
// A_3_0_2 => -107e98
// B_2_0_0 => 331e98
// B_2_0_1 => 224e98
// WXb_2_0 => 303e98
// O_3_0 => 303e98
// A_3_1_0 => -121e98
// A_3_1_1 => 0e100
// A_3_1_2 => -294e97
// B_2_1_0 => -121e98
// B_2_1_1 => -150e98
// WXb_2_1 => -571e97
// O_3_1 => 0e100
// A_3_2_0 => 659e97
// A_3_2_1 => 0e100
// A_3_2_2 => -294e97
// B_2_2_0 => 659e97
// B_2_2_1 => 365e97
// WXb_2_2 => -128e98
// O_3_2 => 0e100
