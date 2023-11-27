class AddIndexesToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_index :transactions, :transaction_category
    add_index :transactions, :posting_date
  end
end
