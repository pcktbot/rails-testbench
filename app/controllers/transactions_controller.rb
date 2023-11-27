class TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all
    @categories = Transaction.unique_transaction_categories
  end

  def show
  end

  def new
  end

  def edit
  end
end
