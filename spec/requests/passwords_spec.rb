require "rails_helper"

RSpec.describe "Passwords", type: :request do
    let(:user) { create(:user) }

    before { sign_in user }

    describe "GET show" do
        it "succeeds" do
            get password_path(user)
            expect(response).to be_successful
        end
    end

    describe "PUT update" do
        it "succeeds" do
            user.update! password: "password123"

            put password_path(user), params: {
                password: {
                    password: "password"
                }
            }
            expect(user.reload.valid_password?("password")).to eq(true)
            expect(response).to be_redirect
        end
    end
end