class CopyWebsiteJob < ApplicationJob
  queue_as :default

  def perform(website)
    puts "Copying website #{website}"
  end
end
