module TransactionQueries
  extend ActiveSupport::Concern

  class_methods do
    def by_date_range(start_date, end_date)
      where("posting_date >= ? AND posting_date <= ?", start_date, end_date)
    end

    def by_category(category_id)
      where(category_id: category_id)
    end

    def unique_transaction_categories
      Transaction.select(:transaction_category).distinct.pluck(:transaction_category)
    end

    def total_amount_by_category(category, start_date, end_date)
      where(transaction_category: category)
        .where("posting_date >= ? AND posting_date <= ?", start_date, end_date)
        .sum(:amount)
    end
    
  end



end
