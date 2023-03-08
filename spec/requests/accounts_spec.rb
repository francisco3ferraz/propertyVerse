require "rails_helper"

RSpec.describe "Accounts", type: :request do
    let(:user) { create(:user) }

    before { sign_in user }

    describe "GET show" do
        it "succeeds" do
            get account_path(user)
            expect(response).to be_successful
        end
    end

    describe "PUT update" do
        it "succeeds" do
            user.update! email: "francisco@teste.com"

            put account_path(user), params: {
                account: {
                    email: "teste@teste.com"
                }
            }
            expect(user.reload.email).to eq("teste@teste.com")
            expect(response).to be_redirect
        end
    end
end