class LanguageGemsController < ApplicationController

    def index
        @gems = LanguageGem.all
        render json: @gems
    end
end
