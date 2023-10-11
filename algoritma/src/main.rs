fn algo1(input_string: &str) -> Option<String> {
    let my_vec: Vec<char> = input_string.chars().collect();
    if let Some(index) = my_vec.iter().position(|&x| x.is_numeric()) {
        let reversed_chars: String = my_vec[0..index].iter().rev().collect();
        let numeric_char = my_vec[index];
        let result = format!("{}{}", reversed_chars, numeric_char);
        Some(result)
    } else {
        None
    }
}

fn main() {
    let my_string = String::from("NEGIE1");
    if let Some(result) = algo1(&my_string) {
        println!("Reversed string: {}", result);
    } else {
        println!("The string does not contain any numbers.");
    }
}
