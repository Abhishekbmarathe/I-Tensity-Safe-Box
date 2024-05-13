import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Body parsing middleware for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting EJS template engine and static file directory
app.set('view engine', 'ejs')
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    // res.render('index');
    res.render(path.join(__dirname, 'src/views/index.ejs'));
});

// Define the predefined array on the server side
const predefinedArray = [
    ["111", "1569", "1060", "413835423936"],
    ["222", "1322", "1183", "343135322829"],
    ["333", "1099", "1166", "344036423840"],
    ["444", "730", "406", "535451525550"],
    ["555", "2655", "1218", "474345414648"],
    ["666", "756", "1203", "343641404033"],
    ["777", "399", "507", "565556545256"],
    ["888", "1075", "466", "444444414440"],
    ["999", "881", "232", "202622222023"],
    ["1010", "469", "426", "344034373437"]
];

// Route to handle form submission and validation
app.post('/validate', (req, res) => {
    const requiredProperties = ['number0', 'number1', 'number2', 'number3'];
    const inputNumbers = [];

    for (const property of requiredProperties) {
        if (!req.body[property]) {
            return res.status(400).json({ error: `Missing property: ${property}` });
        }
        inputNumbers.push(req.body[property]);
    }

    let success = false;
    for (const predefinedNumbers of predefinedArray) {
        if (arraysMatch(predefinedNumbers, inputNumbers)) {
            success = true;
            break;
        }
    }
    res.json({ success });
});

// Function to compare arrays
function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
