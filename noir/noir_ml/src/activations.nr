//! Activation Functions for Neural Networks in Noir
//!
//! This module contains activation functions commonly used in neural networks.
//! The available functions are:
//! - ReLU

use crate::utils::is_positive;
use crate::utils::is_greater_than_signed;

/// ReLU (Rectified Linear Unit) Activation Function.
/// y = max(0, x)
///
/// # Example
/// ```
/// let values = [-5, 2, 0];
/// let activated = relu(values);
/// assert_eq!(activated, [0, 2, 0]);
/// ```
pub fn relu<N>(values: [ Field; N ]) -> [ Field; N ] {
  let mut result = [0; N];

  for i in 0..N {
    if is_positive(values[i]) {
      result[i] = values[i];
    }
  }
  result
}

pub fn sigmoid(x: Field) -> Field {
  let mut exp_neg_x = 1;
  let mut term = 1;
  for i in 1..10 { 
    term = term * (-x) / i;
    exp_neg_x += term;
  }

  let denominator = 1 + exp_neg_x;

  let constant_factor = 10000;
  let sigmoid_approx = constant_factor / denominator;

  sigmoid_approx
}

pub fn poly<N>(values: [ Field; N ]) -> [ Field; N ] {
  let mut result = [0; N];

  for i in 0..N {
    result[i] = values[i] * values[i] + values[i];
  }
  result
}

pub fn abs_diff(a: Field, b: Field) -> Field {
  if is_greater_than_signed(a, b) {
     a - b 
  } else { 
    b - a 
  }
}

////////////////////
//     TESTS      //
////////////////////

#[test]
fn test_relu() {
  assert(relu([ -1, 0, 1]) == [ 0, 0, 1 ]);
  let comp_constant = 10944121435919637611123202872628637544274182200208017171849102093287904247808;
  assert(relu([ comp_constant - 1, comp_constant, comp_constant + 1 ]) == [ comp_constant - 1, comp_constant, 0]);
}

#[test]
fn test_poly() {
  assert(poly([ -1, 0, 1, 2]) == [ 0, 0, 2, 6 ]);
}

#[test]
fn test_sigmoid() {
  let tolerance = 500; // Define an acceptable error margin
  let constant_factor = 10000; // Same as the constant_factor used in sigmoid function
  
  // Test around the value 0, where sigmoid should be close to 0.5
  let sig_0 = sigmoid(0);
  assert(is_greater_than_signed(tolerance, abs_diff(sig_0, (constant_factor / 2))));
  
  // Test for a large positive value, where sigmoid should be close to 1
  let sig_pos = sigmoid(10);
  assert(is_greater_than_signed(tolerance, abs_diff(sig_pos, constant_factor)));
  
  // Test for a large negative value, where sigmoid should be close to 0
  let sig_neg = sigmoid(-10);
  assert(is_greater_than_signed(tolerance, abs_diff(sig_neg, 0)));
}
