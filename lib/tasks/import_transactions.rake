namespace :import do
  desc "Import transactions from a CSV file"
  task transactions: :environment do

    require 'csv'
    require 'activerecord-import'

    filepath = 'ExportedTransactions.csv'
    csv_text = File.read(filepath)
    csv = CSV.parse(csv_text, headers: true)

    transactions = []
    csv.each do |row|
      transactions << Transaction.new({
        transaction_id: row['Transaction ID'],
        posting_date: row['Posting Date'],
        effective_date: row['Effective Date'],
        transaction_type: row['Transaction Type'],
        amount: row['Amount'],
        check_number: row['Check Number'],
        reference_number: row['Reference Number'],
        description: row['Description'],
        transaction_category: row['Transaction Category'],
        payment_type: row['Type'],
        balance: row['Balance'],
        memo: row['Memo'],
        extended_description: row['Extended Description']
      })
    end

    Transaction.import transactions, validate: true
    puts "Imported #{transactions.size} transactions."
  end
end
