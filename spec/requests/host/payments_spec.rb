require "rails_helper"

RSpec.describe "Payments", type: :request do
    let(:user) { create(:user) }
    let(:property) { create(:property, 3, user: user) }
    let(:reservations) { create_list(:reservation, 3, property: property) }
    let(:payments) do
        reservations.map do |reservation|
            create(:payment, reservation: reservation)
        end
    end

    before { sign_in user }

    describe "GET index" do
        it "succeeds" do
            get payments_path
            expect(response).to be_successful
        end
    end
end