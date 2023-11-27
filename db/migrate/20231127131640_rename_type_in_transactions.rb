class RenameTypeInTransactions < ActiveRecord::Migration[7.0]
  def change
    rename_column :transactions, :type, :payment_type
  end
end
  
