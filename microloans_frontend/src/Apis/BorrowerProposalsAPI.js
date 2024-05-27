import api from './AxiosMain.js';

export class BorrowerProposalsAPI {

	static async createBorrowerProposal(interestRate, proposalAmount, proposalMonths, organization ) {
	  const response = await api.post('/borrower-proposals', { "ProposalInterestRate": interestRate, "ProposalAmount": proposalAmount, "ProposalMonths": proposalMonths, "Organization": organization });
	  return response.data;
	}

	static async getAllBorrowerProposals() {
		const response = await api.get('/borrower-proposals');
		return response.data;
	}

	static async getAllBorrowerProposalsById(id) {
		const response = await api.get('/borrower-proposals/' + id);
		return response.data;
	}

	static async createLoanConfirmation(borrowerProposalId, confirmationDate ) {
		const response = await api.post('/borrower-proposals/loan-confirmation', { "borrowerProposalId": borrowerProposalId, "confirmationDate": confirmationDate });
		return response.data;
	  }

	static async getLoanConfirmationById(id) {
		const response = await api.get('/borrower-proposals/' + id);
		return response.data;
	}
}