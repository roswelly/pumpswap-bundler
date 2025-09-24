# PumpFun Buy Sell Bot 

## Overview
A TypeScript library for trading tokens on the PumpFun platform on Solana blockchain. Provides automated buy and sell functionality with bonding curve calculations.

## Project Structure

### Core Files

#### 📦 `package.json`
- **Name**: pumpfun-trader
- **Version**: 1.0.0
- **Description**: PumpFun trading functions for Solana
- **Main Entry**: example.ts
- **Scripts**:
  - `build`: TypeScript compilation
  - `start`: Run example
  - `buy`: Execute buy transaction via CLI
  - `sell`: Execute sell transaction via CLI

#### ⚙️ `config.ts`
- RPC endpoint configuration for Solana mainnet
- Default: `https://api.mainnet-beta.solana.com`
- Alternative endpoints commented for reference

#### 🔧 `constants.ts`
- PumpFun program constants and addresses
- Key addresses: PUMP_FUN_PROGRAM_ID, PUMP_FUN_FEE_RECIPIENT, EVENT_AUTHORITY
- Default commitment level: "finalized"

#### 🛠️ `utils.ts`
- **BondingCurveAccount class**: Core bonding curve logic
- **Key Methods**:
  - `getBuyPrice()`: Calculate tokens received for SOL input
  - `getSellPrice()`: Calculate SOL received for token input
  - `getMarketCapSOL()`: Get current market cap
  - `getFinalMarketCapSOL()`: Get final market cap when curve completes
- **Utility Functions**:
  - `retrieveEnvVariable()`: Environment variable validation

#### 💰 `getBuyTx.ts`
- **Function**: `getBuyTx(wallet, baseMint, amount)`
- **Purpose**: Execute buy transactions on PumpFun
- **Features**:
  - Automatic token account creation
  - Slippage protection (10% buffer)
  - Compute budget optimization
  - Versioned transaction support
- **Returns**: Transaction signature or null

#### 💸 `getSellTx.ts`
- **Function**: `getSellTx(wallet, baseMint, amountInTokens)`
- **Purpose**: Execute sell transactions on PumpFun
- **Features**:
  - Token amount to SOL conversion
  - Slippage protection (10% buffer)
  - Compute budget optimization
  - Versioned transaction support
- **Returns**: Transaction signature or null

#### 📋 `example.ts`
- **Purpose**: Usage examples and CLI interface
- **Functions**:
  - `examplePumpFunTrading()`: Complete trading example
  - `executeBuy()`: Single buy transaction
  - `executeSell()`: Single sell transaction
- **CLI Support**: Direct execution via npm scripts

#### 🔨 `tsconfig.json`
- TypeScript configuration
- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Output to `./dist` directory

## Key Features

### 🔄 Bonding Curve Mechanics
- Implements constant product formula (x * y = k)
- Virtual and real reserve management
- Automatic price discovery
- Market cap calculations

### 🛡️ Safety Features
- Slippage protection (10% buffer)
- Compute budget limits (150,000 units)
- Transaction confirmation
- Error handling and logging

### 🚀 Performance Optimizations
- Parallel async operations
- Versioned transactions
- Compute unit pricing (200,000 microLamports)
- Efficient PDA derivation

### 🔌 Integration
- Solana Web3.js integration
- SPL Token support
- Anchor framework compatibility
- Borsh serialization

## Dependencies

### Core Dependencies
- `@solana/web3.js`: Solana blockchain interaction
- `@solana/spl-token`: Token operations
- `@coral-xyz/anchor`: Solana program framework
- `@coral-xyz/borsh`: Data serialization

### Development Dependencies
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript execution
- `@types/node`: Node.js type definitions

## Usage Examples

### Basic Buy Transaction
```typescript
import { getBuyTx } from './getBuyTx';
import { Keypair, PublicKey } from '@solana/web3.js';

const wallet = Keypair.generate();
const tokenMint = new PublicKey("TOKEN_MINT_ADDRESS");
const solAmount = 0.1; // 0.1 SOL

const signature = await getBuyTx(wallet, tokenMint, solAmount);
```

### Basic Sell Transaction
```typescript
import { getSellTx } from './getSellTx';

const tokenAmount = BigInt(1000); // 1000 tokens
const signature = await getSellTx(wallet, tokenMint, tokenAmount);
```

### CLI Usage
```bash
# Buy 0.1 SOL worth of tokens
npm run buy TOKEN_MINT_ADDRESS 0.1

# Sell 1000 tokens
npm run sell TOKEN_MINT_ADDRESS 1000
```

## Architecture

### Transaction Flow
1. **Validation**: Check bonding curve account exists
2. **Calculation**: Compute token/SOL amounts using bonding curve
3. **PDA Derivation**: Generate required program addresses
4. **Transaction Building**: Create instruction with proper accounts
5. **Execution**: Send and confirm transaction

### Key PDAs (Program Derived Addresses)
- `global`: Global program state
- `bonding-curve`: Token-specific bonding curve
- `creator-vault`: Creator fee collection
- `user_volume_accumulator`: User trading volume tracking
- `fee_config`: Fee configuration

## Security Considerations
- Private keys should be loaded from secure storage in production
- RPC endpoints should be rate-limited and reliable
- Slippage protection prevents MEV attacks
- Compute budget limits prevent resource exhaustion

## Development Setup
```bash
npm install
npm run build
npm start
```

## File Relationships
```
config.ts → RPC configuration
constants.ts → Program addresses
utils.ts → Bonding curve logic
getBuyTx.ts → Buy transaction logic
getSellTx.ts → Sell transaction logic
example.ts → Usage examples & CLI
```

This project provides a complete trading interface for PumpFun tokens with robust error handling, security features, and performance optimizations.
