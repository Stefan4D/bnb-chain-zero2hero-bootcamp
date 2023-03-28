# BNB Chain Zero2Hero Lesson 12 Homework

## Location

The optimised contract can be found in the `exercises/gas` folder.

### Optimisations made

- Changed Solidity version from 0.8.0 to 0.8.19
- Moved variables from Constants contract to GasContract and removed unused variable
- totalSupply now immutable and removed 0 initialisation
- Changed balances mapping to be private and updated the getter function to directly return the mapping call
- Updated addHistory function to remove superfluous loop and update return value to hard-coded true as always returns true
