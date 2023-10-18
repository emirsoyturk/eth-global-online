use noir_ml::layers::{fc};
use noir_ml::activations::{relu};
use noir_ml::utils::{arg_max};

fn main(input: Field) -> Field {
    let w1 = [1, 2, 3, 4, 5, 6];
    let b1 = [1, 2, 3];
    let w2 = [1, 2, 3];
    let b2 = [1];

    let l1 = relu(fc(input, w1, b1));
    let l2 = fc(l1, w2, b2);

    arg_max(l2)
}