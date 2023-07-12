class WebsitesController < ApplicationController
  def index
    @websites = [
      { id: 123, name: "G5 CLW Tester 1", urn: "g5-clw-tester-1" },
      { id: 124, name: "G5 CLW Tester 2", urn: "g5-clw-tester-2" },
      { id: 125, name: "G5 CLW Tester 3", urn: "g5-clw-tester-3" },
      { id: 126, name: "G5 CLW Tester 4", urn: "g5-clw-tester-4" },
      { id: 127, name: "G5 CLW Tester 5", urn: "g5-clw-tester-5" },
      { id: 128, name: "G5 CLW Tester 6", urn: "g5-clw-tester-6" }
    ]
  end



  def copy
    # CopyWebsiteJob.perform("g5-clw-tester")
    # do work
    puts "Are we reaching websites#copy?"

  end

end
