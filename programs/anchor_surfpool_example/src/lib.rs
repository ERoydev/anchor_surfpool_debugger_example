use anchor_lang::prelude::*;

declare_id!("CwLTTXYQL6dWsYu4CXJuzaATag2vaBDczQbgrgXJKBey");

#[program]
pub mod anchor_surfpool_example {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let pda_account = &mut ctx.accounts.pda_account;
        pda_account.value = 123;
        msg!("Initialized PDA account with value: {}", pda_account.value);
        let x: i32 = 15;
        let y: i32 = 20;
        let sum: i32 = x + y;

        msg!("Sum is: {}", sum);
        Ok(())
    }
}

#[derive(Accounts)]
// pub struct Initialize {
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8,
        seeds = [b"pda", user.key().as_ref()],
        bump
    )]
    pub pda_account: Account<'info, PdaAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PdaAccount {
    pub value: u64,
}
