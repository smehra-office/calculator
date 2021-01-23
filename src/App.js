import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Clear from './components/Clear';
import updateInputContext from './contexts/onInput';
import './App.css';

const App = () => {

    let [input, changeInput] = useState('');
    let [previousNumber, updatePreviousNumber] = useState(0);
    let [operator, updateOperator] = useState('');

    const addToInput = element => {
        switch (element) {
            case 'CLEAR': {
                updateState('', 0, ''); // reset 
                break;
            }
            case '0': {
                if (input)
                    updateState(input + element); // append if some input exists
                break;
            }
            case '.': {
                if (!input.includes(element))
                    updateState(input + element); // append ONLY 1 decimal for a operand
                break;
            }
            case '/':
            case '*':
            case '+':
            case '-': {
                if (input) {
                    if (previousNumber) {  // UNSAFE OPERATION ( pressed without pressing = )
                        let result = getResult({ previousNumber, operator, input });
                        updateState('', result, element); //reset input, store result in previous number
                    }
                    else   // SAFE OPERATION (pressed first time OR after pressing = )
                        updateState('', input, element); //reset input, store input in previous number
                }
                break;
            }
            case '=': {
                if (previousNumber && input) {
                    let result = getResult({ previousNumber, operator, input });
                    updateState(result, 0, ''); //store result in input, reset previous number and operand
                }
                break;
            }
            default:
                updateState(input + element);  //append to input
        }
    }

    const updateState = (Input = input, PreviousNumber = previousNumber, Operator = operator) => {
        changeInput(Input);
        updatePreviousNumber(PreviousNumber);
        updateOperator(Operator);
    };

    const getResult = ({ previousNumber, operator, input }) => {
        return String(eval(previousNumber + operator + input));
    }

    return (
        <div className='App'>
            <updateInputContext.Provider value={addToInput} >
                <div className='calc-wrapper'>
                    <div className='row'>
                        <Input>{input}</Input>
                    </div>
                    <div className='row'>
                        <Button>7</Button>
                        <Button>8</Button>
                        <Button>9</Button>
                        <Button>/</Button>
                    </div>
                    <div className='row'>
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>6</Button>
                        <Button>*</Button>
                    </div>
                    <div className='row'>
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>+</Button>
                    </div>
                    <div className='row'>
                        <Button>.</Button>
                        <Button>0</Button>
                        <Button>=</Button>
                        <Button>-</Button>
                    </div>
                    <div className='row'>
                        <Clear>CLEAR</Clear>
                    </div>
                </div>
            </updateInputContext.Provider>
        </div>
    );

};

export default App;