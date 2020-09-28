class ChartsController < ApplicationController
  before_action :authorize_request, only: :create
  before_action :set_chart, only: [:show, :update, :destroy]

  # GET /charts
  def index
    @charts = Chart.all
    # @chart.user = @current_user

    render json: @charts
  end

#===========---
# original working version of index above - below trying to change 
# so instead of showing all charts, only show charts belonging to user: 
#-------------------------
# def index
#   @charts = Chart.where(:user_id => :current_user.id)

#   render json: @charts
# end

##  added function in services/charts in client which may be 
##  the right way to do this, rather than in this file...needs troubleshooting
##  and addition of function call to charts component
#=========-----

  # GET /charts/1
  def show
    render json: @chart
  end

  # POST /charts
  def create
    @chart = Chart.new(chart_params)
    @chart.user = @current_user

    if @chart.save
      render json: @chart, status: :created, location: @chart
    else
      render json: @chart.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /charts/1
  def update
    if @chart.update(chart_params)
      render json: @chart
    else
      render json: @chart.errors, status: :unprocessable_entity
    end
  end

  def add_object
    @chart = Chart.find(params[:id])
    @memory_object = MemoryObject.where(params[:chart_id])

    @chart.memory_objects << @memory_object

    render json: @chart, include: :memory_object 
  end

  # DELETE /charts/1
  def destroy
    @chart.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chart
      @chart = Chart.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def chart_params
      params.require(:chart).permit(:name, :description, :image_url)
    end
end
