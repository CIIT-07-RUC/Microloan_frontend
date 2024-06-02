import api from './AxiosMain.js';

export class BorrowerProposalsAPI {

	static async createBorrowerProposal(borrowerId, interestRate, proposalAmount, proposalMonths, organization, title, description ) {
	  const response = await api.post('/borrower-proposals', { "borrowerId": borrowerId ,"proposalInterestRate": interestRate, "proposalAmount": proposalAmount, "proposalMonths": proposalMonths, "organization": organization, "title": title, "description": description });
	  return response.data;
	}

	static async getAllBorrowerProposals() {
		const response = await api.get('/borrower-proposals');
		return response.data;
	}

	static async getAllBorrowerProposalsById(id) {
		const response = await api.get('/borrower-proposals/proposal-by-id?id=' + id);
		return response.data;
	}

	static async createLoanConfirmation(investorId, borrowerProposalId, confirmationDate ) {
		const response = await api.post('/borrower-proposals/loan-confirmation', { "investorId": investorId ,"borrowerProposalId": borrowerProposalId, "confirmationDate": confirmationDate });
		return response.data;
	  }

	static async getLoanConfirmationById(id) {
		const response = await api.get('/borrower-proposals/' + id);
		return response.data;
	}

	static async getAllBorrowerProposalStatus(id) {
		console.log("idd", id)
		const response = await api.get('/borrower-proposals/borrower-proposal-status?id=' + id);
		return response.data;
	}
}