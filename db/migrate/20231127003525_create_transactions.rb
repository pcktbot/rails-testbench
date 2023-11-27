class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :transaction_id
      t.date :posting_date
      t.date :effective_date
      t.string :transaction_type
      t.decimal :amount
      t.string :check_number
      t.string :reference_number
      t.text :description
      t.string :transaction_category
      t.string :type
      t.decimal :balance
      t.text :memo
      t.text :extended_description

      t.timestamps
    end
  end
end
