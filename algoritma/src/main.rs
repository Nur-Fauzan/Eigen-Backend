use std::io;

fn algo1(input_string: &str) -> Option<String> {
    let my_vec: Vec<char> = input_string.chars().collect();
    if let Some(index) = my_vec.iter().position(|&x| x.is_numeric()) {
        let reversed_chars: String = my_vec[0..index].iter().rev().collect();
        let numeric_char = my_vec[index];
        let result = format!("{}{}\n", reversed_chars, numeric_char);
        Some(result)
    } else {
        None
    }
}

fn algo2(in_string: &str) {
    let words: Vec<&str> = in_string.split_whitespace().collect();

    if let Some(max_length_str) = words.iter().max_by_key(|&s| s.len()) {
        println!("{}: {} character\n", max_length_str, max_length_str.len());
    } else {
        println!("The collection is empty.\n");
    }
}

fn algo3(in_vec: Vec<&str>, que_vec: Vec<&str>) {
    let mut out_vec = vec![];

    for words in que_vec {
        let count = in_vec.iter().filter(|&&x| x == words).count();
        out_vec.push(count)
    }
    let output = format!(
        "[{}]",
        out_vec
            .iter()
            .map(|x| x.to_string())
            .collect::<Vec<String>>()
            .join(", ")
    );
    println!("{}\n", output)
}

fn main() {
    //Soal 1
    let my_string = String::from("NEGIE1");
    if let Some(result) = algo1(&my_string) {
        println!("{}", result);
    } else {
        println!("The string does not contain any numbers.");
    }

    //Soal 2
    let mut in_string = String::new();

    io::stdin()
        .read_line(&mut in_string)
        .expect("Failed to read line");

    algo2(&in_string);

    // Soal 3
    let in_vec = vec!["xc", "dz", "bbb", "dz"];
    let que_vec = vec!["bbb", "ac", "dz"];
    algo3(in_vec, que_vec);
}
