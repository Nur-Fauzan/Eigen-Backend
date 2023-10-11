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

fn algo4(matrix: Vec<[u8; 3]>) -> u8 {
    let num_rows = matrix.len();
    let num_columns = matrix[0].len();
    let mut d1: u8 = 0;
    let mut d2: u8 = 0;

    for i in 0..num_rows {
        for j in 0..num_columns {
            if i == j {
                d1 = d1 + matrix[i][j];
                if j == matrix.len() - 1 - i {
                    d2 = d2 + matrix[i][j];
                }
            } else if j == matrix.len() - 1 - i {
                d2 = d2 + matrix[i][j];
            }
        }
    }

    println!("diagonal pertama: {}", d1);
    println!("diagonal kedua: {}", d2);
    let result = d1 - d2;

    return result;
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

    // Soal 4
    let matrix = vec![[1, 2, 0], [4, 5, 6], [7, 8, 9]];
    let result = algo4(matrix);
    println!("hasil: {}\n", result);
}
