import { dispatchAccount } from '../utils';

const requestAccounts = async (dispatch: any, web3provider: any) => {
  await web3provider
    .send('quai_requestAccounts')
    .then((accounts: Array<string>) => {
      console.log('Accounts returned: ', accounts);
      dispatchAccount(accounts, dispatch);
    })
    .catch((err: Error) => {
      console.log('Error getting accounts.', err);
    });
};

export default requestAccounts;
